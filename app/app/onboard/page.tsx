"use client";

import { useStytchB2BClient, useStytchMember } from '@stytch/nextjs/b2b';
import { Organization } from '@stytch/vanilla-js/b2b';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Link from 'next/link';
import MultiSelect from '@/app/components/MultiSelect';

const cleanPhoneNumber = (phoneNumber: string) => phoneNumber.replaceAll(" ", "").replaceAll("-", "");

export default function Onboard() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [organizationId, setOrganizationId] = useState<Organization>();
    const [alreadyHasOrganization, setAlreadyHasOrganization] = useState<boolean>();
    const [memberId, setMemberId] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [businessType, setBusinessType] = useState('soleproprietorship');
    const businessTypes = [
        { name: "Sole Proprietorship", value: "soleproprietorship" },
        { name: "LLC", value: "llc" },
        { name: "Partnership", value: "partnership" },
    ];

    const [code, setCode] = useState('');

    const stytch = useStytchB2BClient();
    const router = useRouter();
    const { isInitialized } = useStytchMember();

    const authenticate = useCallback(async () => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            try {
                const { discovered_organizations } =
                    await stytch.magicLinks.discovery.authenticate({
                        discovery_magic_links_token: token,
                    });
                if (discovered_organizations.length > 0) {
                    const response = await stytch.discovery.intermediateSessions.exchange({
                        organization_id: discovered_organizations[0].organization?.organization_id,
                        session_duration_minutes: 30,
                    });
                    setOrganizationId(response.organization);
                    setMemberId(response.member_id);
                    setAlreadyHasOrganization(true);

                    console.log({ response }, 'response after exchanging session');
                    if (response.mfa_required?.member_options === null) {
                        // not enrolled in MFA, so enroll them
                        stytch.otps.sms.send({
                            member_id: response.member_id,
                            organization_id: response.organization.organization_id,
                            // @ts-expect-error prompt can be cancelled, but let's just assume it's not
                            mfa_phone_number: cleanPhoneNumber(prompt("Please enter your phone number, including a + and the country code")),
                        });
                    }
                } else {
                    setAlreadyHasOrganization(false);
                }
                setAuthenticated(true);
            } catch {
                setError("Could not authenticate. Please try to log in again with a new email link.");
            }

        };
    }, [stytch]);

    useEffect(() => {
        if (isInitialized) authenticate();
    }, [isInitialized, authenticate]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { email_address, discovered_organizations } = await stytch.discovery.organizations.list();
            console.log({ email_address, discovered_organizations });
            // check that there are no organizations first
            if (discovered_organizations.length > 0) {
                if (!discovered_organizations[0].membership.member) throw new Error("No membership in listed organization");
                setOrganizationId(discovered_organizations[0].organization);
                setMemberId(discovered_organizations[0].membership.member?.member_id);
            } else {
                const response = await stytch.discovery.organizations.create({
                    organization_name: businessName,
                    mfa_policy: "REQUIRED_FOR_ALL",
                    session_duration_minutes: 30,
                });
                stytch.otps.sms.send({
                    member_id: response.member_id,
                    organization_id: response.organization.organization_id,
                    mfa_phone_number: cleanPhoneNumber(whatsAppNumber),
                });
                setOrganizationId(response.organization);
                setMemberId(response.member_id);
            }
        } catch (error) {
            console.error('Error creating organization:', error);
            setError("An error occurred when registering your company; please try again or contact us");
        }
    }, [stytch, whatsAppNumber, businessName]);


    const registerUser = async () => {
        // post data to backend database
        // redirect user to /app/add-bank-info
        stytch.self.update({
            name: firstName + ' ' + lastName,
            untrusted_metadata: {
                firstName,
                lastName,
                businessType,
            }
        });
        const response = await fetch('/api/create-org', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                whatsAppNumber,
                businessName,
                organizationId: organizationId?.organization_id,
                memberId,
                businessType,
            }),
        })
        if (response.ok) {
            router.replace('/app/add-bank-info');
        } else {
            alert('An error occurred when registering your business; try again or please contact us');
        }
    }

    return (
        <div className='py-16 md:py-28 flex min-h-[70vh]'>
            <div className='mx-auto max-w-sm'>
                <h1 className='heading-md'>Welcome to Cowrie</h1>
                {authenticated ? (!organizationId ? (
                    <form onSubmit={handleSubmit}>
                        <Input label='First Name' text={firstName} setText={setFirstName} />
                        <Input label='Last Name' text={lastName} setText={setLastName} />
                        <Input label='WhatsApp number' type="tel" text={whatsAppNumber} setText={setWhatsAppNumber} />
                        {whatsAppNumber !== '' && !whatsAppNumber.includes('+') && <p className='text-red-500'>Please include the country code with a +</p>}
                        <Input label='Business Name' text={businessName} setText={setBusinessName} />
                        <MultiSelect label='Business Type (how did you incorporate in Kenya?)' options={businessTypes} selectedOption={businessType} setSelectedOption={setBusinessType} />
                        <p className='body-text text-sm mt-3'>If your business is not incorporated, contact us to see how you can use Cowrie</p>
                        <Button className='mt-5'>Let&apos;s go</Button>
                    </form>
                ) : (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                           await stytch.otps.sms.authenticate({
                                member_id: memberId,
                                organization_id: organizationId.organization_id,
                                code: code,
                                session_duration_minutes: 30,
                            });
                            if (alreadyHasOrganization && organizationId.organization_id === process.env.NEXT_PUBLIC_ADMIN_ORG) router.replace("/app/admin/orders");
                            else if (alreadyHasOrganization) router.replace("/app/add-bank-info");
                            else registerUser();
                        } catch (error) {
                            console.log(error);
                        }
                    }}>
                        <Input label='SMS Code' text={code} setText={setCode} rounded />
                        <Button>Authenticate</Button>
                    </form>
                )) : <p>{error ? error : 'Loading...'} {error && <Link className="text-primary font-semibold" href="/app/authenticate">Login</Link>}</p>}
            </div>
        </div>
    );
}