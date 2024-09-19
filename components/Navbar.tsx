"use client";
import React, { useState } from "react";
import { Menu, MenuItem, } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-5xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
                <div className="flex items-center">
                    <ModeToggle />
                    User
                </div>
            </Menu>
        </div>
    );
}
