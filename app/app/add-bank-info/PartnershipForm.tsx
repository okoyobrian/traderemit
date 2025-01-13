"use client";

import Input from "@/app/components/Input";

export default function PartnershipForm({ businessName }: { businessName: string }) {
    return (
        <form>
            <h2 className="mt-6 heading-black-sm">Partnership Company</h2>
            <Input type="text" label="Registered Company Name" required text={businessName} />
            <Input type="text" label="Company Certificate Number" required />
            <Input type="text" label="KRA PIN" required />
            <Input type="text" label="Account Operating Mode" required />
            <Input type="text" label="Company Address Used to Incorporate" required />
            <Input type="text" label="Company Industry" placeholder="Importing" required />
        </form>
    );
}