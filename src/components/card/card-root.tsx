import { cn } from "@/utils/cn"

export interface CardRootProps {
    children: React.ReactNode,
    className?: string
}

export function CardRoot({children, className=''}: CardRootProps){

    return (
        <div className={cn(["p-6 flex flex-col border border-gray-500 rounded-[10px]", className])}>
            {children}
        </div>
    )
}