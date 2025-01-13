"use client";

import { useEffect, useState } from "react";
import SolePropForm from "./SolePropForm";
import LLCForm from "./LLCForm";
import PartnershipForm from "./PartnershipForm";
import { useRouter } from "next/navigation";

export default function AddBankInfo() {
    const [businessType, setBusinessType] = useState(null);
    const [bankApprovedStatus, setBankApprovedStatus] = useState(null);
    const [businessName, setBusinessName] = useState('');
    const router = useRouter()

    useEffect(() => {
        fetch("/api/user-banking-status").then(data => data.json()).then(({ businessType, bankApprovedStatus, businessName }) => {
            if (bankApprovedStatus === "approved") {
                router.push("/app/dashboard/balances");
            }
            setBusinessType(businessType);
            setBankApprovedStatus(bankApprovedStatus);
            setBusinessName(businessName);
            
        }).catch((error) => {
            console.error(error);
            alert("An error occurred while fetching your banking status. Please try again.");
        });
    }, [router]);


    return (
        <div className="container py-16">
            <h1 className="heading-md">Your business information</h1>
            <p className="body-text my-3">Add your business information here, so that we can open a bank account for you. Bank accounts are opened securely with our partner Choice Bank, which is regulated by the Central Bank of Kenya.</p>
            {
                bankApprovedStatus === "pending" ? (
                    <p>Your application is pending. Please check back later.</p>
                ) : bankApprovedStatus === "rejected" ? (
                    <p>Your application has been rejected. Please contact us and we can help fix the situation.</p>
                ) : (
                    businessType === "sole-prop" ? (
                        <SolePropForm businessName={businessName} />
                    ) : businessType === "llc" ? (
                        <LLCForm businessName={businessName} />
                    ) : businessType === "partnership" ? (
                        <PartnershipForm businessName={businessName} />
                    ) : "loading..."
                )
            }
        </div>
    )
 
}