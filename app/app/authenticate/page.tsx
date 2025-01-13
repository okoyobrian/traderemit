"use client";

import { useStytchB2BClient, useStytchMember } from '@stytch/nextjs/b2b';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function Authenticate() {
  const { member, isInitialized } = useStytchMember();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const stytch = useStytchB2BClient();
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    console.log(isInitialized, member);
    if (isInitialized && member) {
      // Redirect the user to an authenticated page if they are already logged in
      router.replace("/app/dashboard/balances");
    }
  }, [member, isInitialized, router]);



  const sendEmailMagicLink = async (event: FormEvent) => {
    event.preventDefault();
    const isAllowedData = await fetch('/api/is-off-waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const { isAllowed } = await isAllowedData.json();

    if (!isAllowed) {
      setNotAllowed(true);
      return;
    }

    try {
      const result = await stytch.magicLinks.email.discovery.send({
        email_address: email,
      });
      setEmailSent(true);
      if (result.status_code !== 200) {
        setEmailSent(false);
        throw new Error;
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailSent(false);
    }
  };

  const resetForm = () => {
    setEmailSent(false);
  };

  return (
    <div className='py-32 min-h-[80vh] flex items-center'>
      <div className='mx-auto max-w-sm'>
        {emailSent && (
          <div>
            <p className="my-4 font-medium">Email sent! Please check your inbox.</p>
            <p className='mb-4 text-secondary-text'>You&apos;ll be able to login or sign up from the email link. If something&apos;s not working, please contact us.</p>
            <Button onClick={resetForm}>Try again</Button>
          </div>
        )} 
        {notAllowed && (
          <div>
            <p className="my-4 font-medium">You must sign up for the waitlist before joining Cowrie</p>
            <Button href="/waitlist">Sign up</Button>
          </div>)}
        {!emailSent && !notAllowed && (
          <div>
            <h1 className='font-medium text-lg tracking-tight'>Login</h1>
            <p className='my-3 text-secondary-text font-medium'>If you have access to Cowrie, you can login or sign up here</p>
            <form onSubmit={sendEmailMagicLink}>
              <Input text={email} setText={setEmail} type="email" rounded />
              <Button>Send email</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}