"use client";

import React, { useCallback, useEffect } from 'react';
import { useStytchB2BClient, useStytchMember } from '@stytch/nextjs/b2b';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from './Button';

export default function LogInButton() {
  const stytch = useStytchB2BClient();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { member, isInitialized } = useStytchMember();
  const pathname = usePathname()



  const logout = useCallback(() => {
    if (stytch.session.getSync()) stytch.session.revoke();
    router.replace('/app/authenticate');
  }, [stytch, router]);

  useEffect(() => {
    const session = stytch.session.getSync();
    if (session) setLoggedIn(true);
    if (!session && isInitialized) setLoggedIn(false);
  }, [stytch, isInitialized, member, pathname]);

  return <div className='mx-6 font-medium'>
    {loggedIn === true && (
      <>
        {pathname.includes("app") && <span className='body-text'>{member?.email_address}</span>}
        <button onClick={logout} className='mx-6'>Log out</button>
        {!pathname.includes("app") && <Button href="/app/dashboard/balances">Dashboard</Button>}
      </>
    )}

    {loggedIn === false && !pathname.includes("onboard") && (
      <>
        <Link href="/app/authenticate" className="mr-6">Log in</Link>
        <Button href="/waitlist">Sign up</Button>
      </>
    )}
  </div>;
};