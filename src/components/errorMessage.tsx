import { CircleAlert } from "lucide-react";
import { ReactNode } from "react";

export function ErrorMessage({children}: {children: ReactNode}){

    return(
        <span className="flex gap-1 items-center text-red-300 text-xs leading-[140%] pt-1.5">
            <CircleAlert size={16}/>
            {children}
        </span>
    )
}