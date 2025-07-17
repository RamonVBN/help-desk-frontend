import { ComponentProps } from "react";



interface Input extends ComponentProps<'input'> {}


export function Input({type='text', id, placeholder, ...rest}: Input) {


    return (
        <div className="flex flex-col border-b border-gray-500">
            <label className="font-bold text-[10px] leading-[140%] text-gray-300 placeholder:font-normal placeholder:text-base placeholder:leading-[140%] placeholder:text-gray-400" htmlFor={id}>{id!.toUpperCase()}</label>
            <input {...rest} className="py-2 outline-0" type={type}  id={id} placeholder={placeholder} />
        </div>
    )
}