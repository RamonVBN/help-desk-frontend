import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface Input extends ComponentProps<'input'> {
    className?: string
    label: string
    error?: boolean
}

export function Input({type='text', label, placeholder, className, error = false, ...rest}: Input) {


    return (
        <div className={`group flex flex-col border-b border-gray-500 ${!error && 'focus-within:border-blue-300'} ${error && 'border-red-300'}`}>
            <label className={`font-bold text-[10px] leading-[140%] text-gray-300 placeholder:font-normal placeholder:text-base placeholder:leading-[140%] placeholder:text-gray-400 ${!error && 'group-focus-within:text-blue-300'} ${error && 'text-red-300'}`} htmlFor={label}>{label.toUpperCase()}</label>
            <input {...rest} className={cn(["py-2 outline-0", className ])} type={type}  id={label} placeholder={placeholder} />
        </div>
    )
}