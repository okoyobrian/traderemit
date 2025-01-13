"use client";

import { StytchB2BProvider } from '@stytch/nextjs/b2b';
import { createStytchB2BUIClient } from '@stytch/nextjs/b2b/ui';
import { AuthFlowType, B2BProducts } from '@stytch/vanilla-js';

// optional object for configuring SDK cookie behavior, currently showing defaults
const stytchOptions = {
    cookieOptions: {
        opaqueTokenCookieName: "stytch_session",
        jwtCookieName: "stytch_session_jwt",
        path: "",
        availableToSubdomains: false,
        domain: "",
    },
    products: [B2BProducts.emailMagicLinks, B2BProducts.oauth],
    sessionOptions: { sessionDurationMinutes: 60 },
    authFlowType: AuthFlowType.Discovery,
    directLoginForSingleMembership: {
        status: true,
        ignoreInvites: false,
        ignoreJitProvisioning: false,
    }
}

if (!process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN) throw new Error("Missing NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN");

const stytchClient = createStytchB2BUIClient(
    process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN,
    stytchOptions
);

export default function StytchProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <StytchB2BProvider stytch={stytchClient}>
                {children}
        </StytchB2BProvider>
    );
}
