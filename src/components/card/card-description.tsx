import { cn } from "@/utils/cn"

interface CardDescriptionProps  {

    description: string
    className?: string
}


export function CardDescription({description, className=''}: CardDescriptionProps){

    return (
        <p className={cn(["font-normal text-xs leading-[140%] text-gray-300", className])}>{description}</p>
    )
}