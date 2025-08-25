import React from "react";

export function AvailableHourTag({children}: {children: React.ReactNode}){

    return (
        <span className="py-1.5 px-3 rounded-full border border-gray-500 text-gray-400 text-xs font-bold leading-[140%]">
            {children}
        </span>
    )
}