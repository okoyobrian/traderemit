"use client";

import Input from "@/app/components/Input";
import { useState } from "react";
import MultiSelect from "@/app/components/MultiSelect";
import Button from "@/app/components/Button";
import CurrencyInput from "@/app/components/CurrencyInput";
import InvoiceUpload from "@/app/components/InvoiceUpload";

const paymentOptions = [
    { name: "Bank", value: "bank" },
    { name: "Cowrie Balance", value: "balance" },
    { name: "Cash", value: "cash" },
];

export default function PaymentCard() {
    const [orderName, setOrderName] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(500);
    const [currency, setCurrency] = useState("USD");
    const [method, setMethod] = useState("bank");

    return (
        <div className="border border-gray-300 shadow-md p-4 px-8 pb-8 rounded-3xl">
            <InvoiceUpload />
            
            <Input label="Order Name" text={orderName} setText={setOrderName} className="w-full" />
            <Input label="Recipient" text={recipient} setText={setRecipient} className="w-full" />
            <CurrencyInput
                amount={amount}
                setAmount={setAmount}
                currency={currency}
                setCurrency={setCurrency}
            />
            <MultiSelect label="How do you want to pay?" options={paymentOptions} selectedOption={method} setSelectedOption={setMethod} />
            <Button className="btn-primary mt-4 w-full mt-6">Continue</Button>
        </div>
    )
}