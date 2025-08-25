import { CircleCheckBig, CircleHelp, Clock2 } from "lucide-react";


interface CalledStatus {

    status: 'OPEN' | 'PROGRESS' | 'CLOSED'
    minimalist?: true | false
}


export function CalledStatus({ status, minimalist = false }: CalledStatus) {

    return (
        <div className="flex">
            <span className={`rounded-full p-1.5 ${!minimalist && 'md:px-3'} flex gap-2 items-center font-bold text-xs ${status === 'OPEN' && 'bg-red-200/20 text-red-200'} ${status === 'PROGRESS' && 'bg-blue-300/20 text-blue-300'} ${status === 'CLOSED' && 'bg-green-400/20 text-green-400'} `}>
                {
                    status === 'OPEN' && (
                        <CircleHelp strokeWidth={2} className="size-4" />
                    )

                }
                {
                    status === 'PROGRESS' && (
                        <Clock2 className="size-4" />
                    )
                }

                {
                    status === 'CLOSED' && (
                        <CircleCheckBig className="size-4" />
                    )
                }

                {
                    !minimalist && (
                        <span className="hidden md:inline">
                            {status === 'OPEN' && 'Aberto'}
                            {status === 'PROGRESS' && 'Em atendimento'}
                            {status === 'CLOSED' && 'Encerrado'}
                        </span>
                    )
                }
            </span>
        </div>
    )
}