'use client'

import { useQuery } from "@tanstack/react-query";
import { Called, getCalleds, } from "@/api/getCalleds";
import { CalledStatus } from "@/components/pages/calledsPages/components/calledStatus";
import { TechCalledCard } from "@/components/pages/calledsPages/techCalleds/techCalledCard";

interface TechCalledsProps {

    initialCalledsData: Called[]
}

export function TechCalleds({initialCalledsData}: TechCalledsProps) {

    const {data: techCalleds = initialCalledsData} = useQuery<Called[]>({
        queryKey: ['calleds'],
        queryFn: getCalleds,
    })

    const progressCalleds = techCalleds?.filter((called) => called.status === 'PROGRESS')

    const openCalleds = techCalleds?.filter((called) => called.status === 'OPEN')

    const closedCalleds = techCalleds?.filter((called) => called.status === 'CLOSED')

    return (
        <div className="flex flex-col gap-4 md:gap-6 h-full w-full">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Meus chamados</h1>

            <div className="flex flex-col gap-6 lg:overflow-y-auto scrollbar-no-arrows">
                <div className="flex flex-col gap-4">
                    <CalledStatus status="PROGRESS"/>
                
                    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
                        {
                            progressCalleds?.map((called) => {
                                return (
                                    <TechCalledCard called={called} key={called.id} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <CalledStatus status="OPEN"/>

                    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
                        {
                            openCalleds?.map((called) => {
                                return (
                                    <TechCalledCard called={called} key={called.id} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <CalledStatus status="CLOSED"/>
                    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
                       {
                            closedCalleds?.map((called) => {
                                return (
                                    <TechCalledCard called={called} key={called.id} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}