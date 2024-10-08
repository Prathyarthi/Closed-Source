'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/ModeToggle';
import Link from 'next/link';
import UserAccountDropDown from './UserDropDown';
import { usePathname } from 'next/navigation';
export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  // console.log(pathname);
  const { data: session } = useSession();

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
            <div className={cn(pathname === '/' ? 'text-blue-300' : '')}>
              Home
            </div>
          </Link>
          <Link href="/contributions" passHref>
            <div
              className={cn(
                pathname?.includes('/contributions') ? 'text-blue-300' : '',
              )}
            >
              Contributions
            </div>
          </Link>
          <Link href="/projects" passHref>
            <div
              className={cn(
                pathname?.includes('/projects') ? 'text-blue-300' : '',
              )}
            >
              Projects
            </div>
          </Link>
          <Link href="/groups" passHref>
            <div
              className={cn(
                pathname?.includes('/groups') ? 'text-blue-300' : '',
              )}
            >
              Groups
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
