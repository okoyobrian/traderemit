"use client";

import "../globals.css";
import Image from "next/image";
import LogInButton from "../components/LogInButton";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    return (
        <>
            <nav className="border-b border-black/20">
                <div className={`${pathname.includes("dashboard") || pathname.includes("admin") ? "px-4" : "container"} flex items-center py-3`}>
                    <Image src="/logo-text.svg" alt="Logo" width={150} height={75} />
                    <span className="flex-1"></span>
                    <LogInButton />
                </div>
            </nav>
            {children}
        </>
    );
}
