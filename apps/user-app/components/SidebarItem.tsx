"use client"
import { usePathname, useRouter } from "next/navigation"
import React, { ReactNode } from "react"

export const SidebarItem = ({ href, title, icon }: { href: string; icon: ReactNode; title: string; }) => {
    const router = useRouter();
    const Pathname = usePathname()
    const selected = Pathname === href

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`} onClick={() => {
        router.push(href)
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}