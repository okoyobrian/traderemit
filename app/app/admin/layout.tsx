"use client";

import { usePathname } from "next/navigation";
import {
  Bars3Icon as Bars3Outline,
  UserGroupIcon as UserGroupOutline,
  BuildingStorefrontIcon as BuildingStorefrontOutline,
  ClipboardDocumentListIcon as ClipboardDocumentListOutline,
  Cog6ToothIcon as Cog6ToothOutline,
} from "@heroicons/react/24/outline";
import {
  UserGroupIcon as UserGroupSolid,
  BuildingStorefrontIcon as BuildingStorefrontSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  Cog6ToothIcon as Cog6ToothSolid,
} from "@heroicons/react/24/solid";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const navItems = [
        { href: "/app/admin/users", label: "Users", outline: UserGroupOutline, solid: UserGroupSolid },
        { href: "/app/admin/suppliers", label: "Suppliers", outline: BuildingStorefrontOutline, solid: BuildingStorefrontSolid },
        { href: "/app/admin/orders", label: "Orders", outline: ClipboardDocumentListOutline, solid: ClipboardDocumentListSolid },
        { href: "/app/admin/config", label: "Configuration", outline: Cog6ToothOutline, solid: Cog6ToothSolid }
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
                            <a key={item.href} href={item.href} className={`flex items-center gap-2 py-2 text-sm hover:bg-gray-100 rounded ${active ? "text-primary font-semibold" : ""}`}>
                                {active ? <item.solid className="h-5 w-5" /> : <item.outline className="h-5 w-5" />}
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </nav>
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}