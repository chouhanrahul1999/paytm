import React, { JSX } from "react"

export function Card({
    title,
    children
}: {
    title: string;
    children?: React.ReactNode;
}): JSX.Element {
    return (
        <div className="rounded-xl border p-4 border-gray-300 bg-white">
            <h1 className="text-xl border-b border-gray-300 pb-2">{title}</h1>
            <p>{children}</p>
        </div>
    )
}