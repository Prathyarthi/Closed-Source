'use client';

import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/ModeToggle';
import Link from 'next/link';
import UserAccountDropDown from './UserDropDown';
export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSetActive = (link: string) => {
    setActive(link);
  };

  return (
    <div
      className={cn(
        'wrapper sticky top-0 z-50 mx-auto flex w-full items-center gap-2 py-6',
        className,
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-secondary/15 p-6 shadow-lg shadow-neutral-600/5 backdrop-blur-lg">
        <div className="flex space-x-6">
          <Link href="/" passHref>
            <div
              onClick={() => handleSetActive('home')}
              className={cn(active === 'home' ? 'text-blue-300' : '')}
            >
              Home
            </div>
          </Link>
          <Link href="/contributions" passHref>
            <div
              onClick={() => handleSetActive('contributions')}
              className={cn(active === 'contributions' ? 'text-blue-300' : '')}
            >
              Contributions
            </div>
          </Link>
          <Link href="/projects" passHref>
            <div
              onClick={() => handleSetActive('projects')}
              className={cn(active === 'projects' ? 'text-blue-300' : '')}
            >
              Projects
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <ModeToggle />
          {!session ? (
            <Link
              href={'/sign-in'}
              className="rounded-full bg-blue-500 px-4 py-2 text-white"
            >
              Sign in
            </Link>
          ) : (
            <>
              <UserAccountDropDown />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
