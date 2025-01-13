import React from 'react';
import Image from "next/image"

function Balance({ imageUrl, currency, amount, currencyCode }: {
    imageUrl: string;
    currency: string;
    amount: number;
    currencyCode: string;
}) {
    return (
        <div className="p-6 px-8 border rounded-xl shadow-sm inline-block min-w-fit">
            <div className="flex items-center">
                <Image src={imageUrl} alt={currency} className="mr-2" width={24} height={24} />
                <span className="font-medium">{currency}</span>
            </div>
            <div className="text-4xl font-semibold py-3">
                {currencyCode === "USD" && "$"}{amount} <span className="text-2xl font-normal text-secondary-text">{currencyCode}</span>
            </div>
            <div className="flex space-x-4">
                <button className="pr-3 text-primary font-semibold hover:text-primary-light text-nowrap">Add money</button>
                <button className="pr-3 text-primary font-semibold hover:text-primary-light text-nowrap">Exchange</button>
                <button className="pr-3 text-primary font-semibold hover:text-primary-light text-nowrap">Transfer</button>
            </div>
        </div>
    );
}

const TransferPage: React.FC = () => {
    return (
        <div className='container'>
            <h1 className='heading-md mt-8'>Your balances</h1>
            <p className="font-medium text-md tracking-tight my-3 text-secondary-text">Store your money safely in USD, KES, or CNY. Get the best transaction times when you store money here.</p>
            <p className="font-medium text-md tracking-tight my-3 text-secondary-text">Want to keep your money in the bank? You may also make a transfer from your bank every time you want to pay an order.</p>
            <div className='flex gap-8 flex-wrap mt-8'>
            <Balance
                imageUrl="/currencies/usd.png"
                currency="US Dollars"
                amount={1000}
                currencyCode="USD"
            />
            <Balance
                imageUrl="/currencies/cny.png"
                currency="Chinese Yuan"
                amount={1000}
                currencyCode="CNY"
            />
            <Balance
                imageUrl="/currencies/kes.png"
                currency="Kenyan Shillings"
                amount={1000}
                currencyCode="KES"
            />
            </div>
        </div>
    );
};

export default TransferPage;