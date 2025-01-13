import { useState } from "react";

interface CurrencyInputProps {
    amount: number;
    setAmount: (value: number) => void;
    currency: string;
    setCurrency: (value: string) => void;
}

const stringToNumber = (str: string) => {
    const num = Number(str.replaceAll(",", ""));
    return isNaN(num) ? 0 : num;
}
const processNumberString = (str: string) => {
    const result = str.replace(/[^\d]/g, '');
    const formatted = new Intl.NumberFormat('en-KE').format(Number(result));
    return formatted;
}

export default function CurrencyInput({
    amount,
    setAmount,
    currency,
    setCurrency,
}: CurrencyInputProps) {
    const [amountString, setAmountString] = useState(amount.toString());

    return (
        <div>
            <label className="block mb-2 mt-3 font-medium text-md tracking-tight mb-1 text-secondary-text" htmlFor="currencyInput">
                Amount
            </label>
            <div className="flex items-center mb-4 mr-2 border border-gray-300 rounded-md">
                <input
                    id="currencyInput"
                    type="text"
                    className="w-full p-2 px-4 rounded-md"
                    value={amountString}
                    onChange={(e) => {
                        if (stringToNumber(e.target.value) >= 0) {
                            setAmountString(processNumberString(e.target.value))
                            setAmount(stringToNumber(e.target.value))
                        }
                    }}
                />
                <img
                    src={currency === "CNY" ? "/currencies/cny.png" : "/currencies/usd.png"}
                    alt={currency}
                    className="mr-2 w-5 h-5"
                />
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="pl-0 p-2 mr-4"
                >
                    <option value="CNY">CNY</option>
                    <option value="USD">USD</option>
                </select>
            </div>
            <span className="text-sm body-text !text-red-700 mb-6 block">
                {stringToNumber(amountString) < 50 && "You must send at least 50 USD or CNY"}
                {stringToNumber(amountString) > 10000 && currency === "USD" && "You may not send more than 10,000 USD at this time. Contact us to increase your limit."}
                {stringToNumber(amountString) > 70000 && currency === "CNY" && "You may not send more than 70,000 CNY at this time. Contact us to increase your limit."}
            </span>
        </div>
    );
}