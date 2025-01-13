"use client";

import { usePathname } from "next/navigation";
import {
  Bars3Icon as Bars3Outline,
  CurrencyDollarIcon as CurrencyDollarOutline,
  BuildingStorefrontIcon as BuildingStorefrontOutline,
  ClipboardDocumentListIcon as ClipboardDocumentListOutline,
  WalletIcon as WalletOutline,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import {
  CurrencyDollarIcon as CurrencyDollarSolid,
  BuildingStorefrontIcon as BuildingStorefrontSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  WalletIcon as WalletSolid
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const navItems = [
        { href: "/app/dashboard/pay", label: "Pay", outline: CurrencyDollarOutline, solid: CurrencyDollarSolid },
        { href: "/app/dashboard/suppliers", label: "Suppliers", outline: BuildingStorefrontOutline, solid: BuildingStorefrontSolid },
        { href: "/app/dashboard/orders", label: "Orders", outline: ClipboardDocumentListOutline, solid: ClipboardDocumentListSolid },
        { href: "/app/dashboard/balances", label: "Balance", outline: WalletOutline, solid: WalletSolid },
        { href: "/support", label: "Get Support", outline: ArrowTopRightOnSquareIcon, solid: ArrowTopRightOnSquareIcon },
    ];

    return (
        <div className="md:flex">
            <nav className="flex flex-col w-full md:w-64 bg-white shadow md:h-screen p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button className="md:hidden">
                        <Bars3Outline className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-4">
                    {navItems.map((item) => {
                        const active = pathname?.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} className={`flex items-center gap-2 py-2 text-sm hover:bg-gray-100 rounded ${active ? "text-primary" : ""}`} target={item.href === "/support" ? "_blank" : ""}>
                                {active ? <item.solid className="h-5 w-5" /> : <item.outline className="h-5 w-5" />}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}