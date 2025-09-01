'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavLinkProps {

    name: string
    href: string
    closeNavMenu: () => void
    children: ReactNode
}

export function NavLink({closeNavMenu, name, children, href}: NavLinkProps) {

    const pathname = usePathname()

    return (
        <Link onClick={closeNavMenu} prefetch href={href} className={`w-full px-3 py-4 rounded-[5px] h-[2.75rem] flex gap-3 items-center transition-colors  ${pathname === href ? 'bg-blue-800 text-gray-600' : 'hover:bg-gray-200 text-gray-400 cursor-pointer hover:text-gray-600' }`}>
            {children}
            <span className="text-[14px] leading-[140%]">{name}</span>
        </Link>
    )
}