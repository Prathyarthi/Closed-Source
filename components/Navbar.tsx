'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/ModeToggle';
import Link from 'next/link';
export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

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
              className={cn(
                active === 'home' ? 'text-blue-200' : 'text-gray-100',
              )}
            >
              Home
            </div>
          </Link>
          <Link href="/contributions" passHref>
            <div
              onClick={() => handleSetActive('contributions')}
              className={cn(
                active === 'contributions' ? 'text-blue-200' : 'text-gray-100',
              )}
            >
              Contributions
            </div>
          </Link>
          <Link href="/projects" passHref>
            <div
              onClick={() => handleSetActive('projects')}
              className={cn(
                active === 'projects' ? 'text-blue-200' : 'text-gray-100',
              )}
            >
              Projects
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <ModeToggle />
          <Link href="/sign-in">
            <div
              className={cn(
                active === 'sign-in' ? 'text-blue-200' : 'text-gray-100',
              )}
            >
              Sign In
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
