"use client"
import { Provider as JotaiProvider } from "jotai"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <JotaiProvider>{children}</JotaiProvider>
}