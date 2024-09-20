'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/ModeToggle';
import Link from 'next/link';

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        'wrapper sticky top-0 z-50 mx-auto flex w-full items-center gap-2 py-6',
        className,
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-secondary/15 p-6 shadow-lg shadow-neutral-600/5 backdrop-blur-lg">
        <div className="flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/">Contributions</Link>
          <Link href="/">Projects</Link>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
