import { Ban, CircleCheck } from "lucide-react"


interface ServiceStatusProps {

    status: 'ACTIVE' | 'INACTIVE'
}

export function ServiceStatus({ status }: ServiceStatusProps) {

    return (
        <div className="flex max-w-[6rem] items-center justify-start">
            <div className={` p-1.5 md:px-3 rounded-full font-bold text-xs leading-[140%] ${status === "ACTIVE" ? 'bg-green-400/20 text-green-400' : 'bg-red-300/20 text-red-300'}`}>

                <span className="md:hidden">
                    {

                        status === 'ACTIVE' ? (
                            <CircleCheck size={16} />
                        ) :
                            <Ban size={16} />

                    }
                </span>

                <span className="hidden md:inline">
                    {
                        status === 'ACTIVE' ? (
                            'Ativo'
                        ) :
                            'Inativo'
                    }
                </span>

            </div>
        </div>
    )
}