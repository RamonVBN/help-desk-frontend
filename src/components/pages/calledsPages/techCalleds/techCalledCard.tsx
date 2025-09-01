'use client'

import { CircleCheckBig, Clock2 } from "lucide-react";
import { EditButton } from "../../../editButton";
import { Button } from "../../../ui/button";

import * as Card from '@/components/card';
import { CardTitle } from "../../../card/card-title";
import { CardDescription } from "../../../card/card-description";
import { Separator } from "../../../ui/separator";
import { Avatar } from "../../../avatar";
import { CalledStatus } from "../components/calledStatus";
import Link from "next/link";
import { Called } from "@/api/getCalleds";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/axios";
import { format } from "date-fns";

interface TechCalledCardProps {
    called: Called
}

export function TechCalledCard({ called }: TechCalledCardProps) {

    const queryClient = useQueryClient() 

    const {mutate: updateCalledStatus} = useMutation({
        mutationFn: (status: 'PROGRESS' | 'CLOSED') => api.patch(`/calleds/${called?.id}`, {
            status
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['calleds']})
        }
    })

    return (
        <Card.Root className="p-5 lg:w-[21.625rem]">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">

                    <span className="font-bold text-xs leading-[140%] text-gray-400 truncate max-w-[6.875rem]">{called.id}</span>

                    <div className="flex gap-2">
                        <Link href={`/calleds/${called.id}`}>
                            <EditButton />
                        </Link>

                        {
                            called.status === 'PROGRESS' && (
                                <Button onClick={() => updateCalledStatus('CLOSED')} size={'sm'} className="font-bold text-xs leading-[140%] ">
                                    <CircleCheckBig size={14} />
                                    Encerrar
                                </Button>
                            )
                        }

                        {
                            called.status === 'OPEN' && (
                                <Button onClick={() => updateCalledStatus('PROGRESS')} size={'sm'} className="font-bold text-xs leading-[140%] ">
                                    <Clock2 size={14} />
                                    Iniciar
                                </Button>
                            )
                        }
                    </div>
                </div>
                
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col">
                        <CardTitle className="text-base" title={called.title} />
                        <CardDescription description={called.service.name} />
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-200 text-xs leading-[120%]">{format(called.updatedAt, 'dd/MM/yy HH:mm')}</span>
                        <span className="text-[0.875rem] leading-[120%] ">
                            <span className="text-[0.625rem] font-bold">R$ </span>
                            {(called.service.price + called
                                .additionalServices.reduce((accumulator, currentValue)  => {
                                    return accumulator + currentValue.price
                                }, 0)
                            ).toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                </div>
            </div>

            <Separator className="bg-gray-500"/>

            <div className="mt-4 flex justify-between">
                <div className="flex gap-1.5 items-center">
                    <Avatar imageUrl={called.client.imageUrl} username={called.client.name} className="w-5 h-5 text-[0.546875rem]" />

                    <span className="font-bold text-xs leading-[120%] text-gray-200">{called.client.name}</span>
                </div>

                <CalledStatus minimalist status={called.status}/>
            </div>
        </Card.Root>
    )
}