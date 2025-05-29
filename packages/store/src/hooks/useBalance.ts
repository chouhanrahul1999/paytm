"use client";

import { atom, useAtom } from "jotai";

export const balanceAtom = atom(0);

export const useBalance = () => {
    const [value, setValue] = useAtom(balanceAtom);
    return [value, setValue] as const;
}