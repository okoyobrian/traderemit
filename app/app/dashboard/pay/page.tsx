"use client";

import PaymentCard from "./PaymentCard";


export default function Page () {
    
    return (
        <div className="grid lg:grid-cols-[1fr_20rem] py-8 gap-16 container items-center">
            <div>
                <h1 className="heading-md mt-8 mb-3">Send money with ease</h1>
                <p className="body-text my-3">Send USD or CNY to China from a Kenyan bank account, or from your balance</p>
                <p className="body-text my-3">Banks will charge you a sneaky hidden fee: they markup the exchange rate. We don’t do that: we always give you the real, mid-market exchange rate</p>
                <p className="!text-primary-text body-text my-3">Today’s exchange rate: 1 USD = 130 KES</p>
            </div>
            <div>
                <PaymentCard />
            </div>
            </div>
    )
}