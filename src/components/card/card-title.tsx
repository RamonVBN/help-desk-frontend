import { cn } from "@/utils/cn"

interface CardTitleProps  {

    title: string
    className?: string
}


export function CardTitle({title, className=''}: CardTitleProps){

    return (
        <h2 className={cn(["text-xl leading-[140%] text-gray-200 font-bold", className])}>{title}</h2>
    )
}