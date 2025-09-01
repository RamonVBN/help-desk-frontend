'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheckBig, Clock2, Plus, Trash } from "lucide-react";
import Link from "next/link";

import * as Card from '@/components/card'

import { CalledStatus } from "@/components/pages/calledsPages/components/calledStatus";
import { Avatar } from "@/components/avatar";
import { Separator } from "@/components/ui/separator";

import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, User } from "@/api/getUser";
import { Called } from "@/api/getCalleds";
import { useParams } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { format } from "date-fns";
import { api } from "@/libs/axios";
import { useState } from "react";
import { ServiceModal } from "@/components/pages/servicesPage/serviceModal";


export default function CalledDetails() {

    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false)

    const params = useParams()

    const calledId = params.id

    const queryClient = useQueryClient()

    const { data: user } = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    const { data: called } = useQuery<Called>({
        queryKey: ['calleds', calledId],
        queryFn: async () => {
            const res = await api.get(`/calleds/${calledId}`)

            const called = res.data.called

            return called
        }
    })

    const { mutate: updateCalledStatus } = useMutation({
        mutationFn: (status: 'PROGRESS' | 'CLOSED') => api.patch(`/calleds/${called?.id}`, {
            status
        }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calleds'] })
        }
    })

    const { mutate: deleteAdditionalServices } = useMutation({
        mutationFn: (addServiceId: string) => api.delete(`/additional-services/${addServiceId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calleds'] })
        }
    })

    function handleCloseAddServiceModal(){
        setIsAddServiceModalOpen(false)
    }

    if (!called) {

        return 
        
    }

    return (
        <div className="w-full flex flex-col lg:items-center">

            <div className="lg:w-[50rem]">

                <Link href={'/calleds'} className="flex gap-2 items-center font-bold text-xs leading-[140%] text-gray-300">
                    <Button variant={'ghost'} className="p-2 mr-auto hover:bg-gray-500">
                        <ArrowLeft size={14} />
                        Voltar
                    </Button>
                </Link>

                <div>
                    <div className="flex flex-col gap-4 lg:gap-6">

                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between lg:min-h-[2.5rem] ">
                            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Chamado detalhado</h1>
                            {
                                user?.role !== 'CLIENT' && (
                                    <div className="flex gap-2 w-full lg:max-w-[20.875rem] ">

                                        {
                                            called.status === 'OPEN' && (
                                                <Button onClick={() => updateCalledStatus('PROGRESS')} variant={'secondary'} className={`rounded-[5px] flex-[1_1_20.875rem]  ${user?.role === 'ADMIN' ? 'order-1' : 'order-2 bg-gray-200 text-gray-500 hover:bg-gray-200/95'}`}>
                                                    <Clock2 size={18} />
                                                    {
                                                        user?.role === 'ADMIN' && (
                                                            'Em atendimento'
                                                        )
                                                    }
                                                    
                                                    {
                                                        user?.role === 'TECHNICIAN' && (
                                                            'Iniciar atendimento'
                                                        )
                                                    }
                                                </Button>
                                            )
                                        }
                                        {
                                            (called.status === 'OPEN' || called.status === 'PROGRESS') && (
                                                <Button onClick={() => updateCalledStatus('CLOSED')} variant={'secondary'} className={`rounded-[5px] flex-[1_1_20.875rem] ${user?.role === 'TECHNICIAN' && 'lg:flex-[1_1_11.1875rem]'}`}>
                                                    <CircleCheckBig size={18} />
                                                    {
                                                        user?.role === 'ADMIN' && (
                                                            'Encerrado'
                                                        )
                                                    }

                                                    {
                                                        user?.role === 'TECHNICIAN' && (
                                                            'Encerrar'
                                                        )
                                                    }
                                                </Button>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row lg:items-start lg:flex-wrap">
                            <Card.Root className="p-5 lg:p-6 flex gap-5 lg:flex-[30rem]">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xs leading-[140%] text-gray-300">{called?.id}</span>
                                        <CalledStatus status={called.status} />
                                    </div>
                                    <Card.Title title={called?.title} className="text-base" />
                                </div>

                                <div>
                                    <Card.Description description="Descrição" />
                                    <p className="text-[0.875rem] leading-[140%] text-gray-200">{called?.description}</p>
                                </div>

                                <div>
                                    <Card.Description description="Categoria" />
                                    <span className="text-[0.875rem] leading-[140%] text-gray-200">{called?.service.name}</span>
                                </div>

                                <div className="flex gap-8 ">

                                    <div>
                                        <Card.Description description="Criado em" />
                                        <span className="text-xs leading-[140%] text-gray-200">
                                            {format(called.createdAt, 'dd/MM/yy - hh:mm')}
                                        </span>
                                    </div>

                                    <div>
                                        <Card.Description description="Atualizado em" />
                                        <span className="text-xs leading-[140%] text-gray-200">
                                            {format(called.updatedAt, 'dd/MM/yy - hh:mm')}
                                        </span>
                                    </div>
                                </div>

                                {

                                    user?.role !== 'CLIENT' && (
                                        <div className="flex flex-col gap-2">
                                            <Card.Description description="Cliente" />
                                            <div className="flex items-center gap-2">
                                                <Avatar imageUrl={called.client.imageUrl} username={called.client.name} className="w-5 h-5 text-[8.75px]" />
                                                <span className="text-[0.875rem] leading-[140%] text-gray-200">{called?.client.name}</span>
                                            </div>
                                        </div>
                                    )
                                }

                            </Card.Root>

                            <Card.Root className="p-5 lg:p-6 lg:flex-[18.5rem]">

                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <Card.Description description="Técnico responsável" />
                                        <div className="flex gap-2">
                                            <Avatar imageUrl={called.technician.imageUrl} username={called.technician.name} className="w-8 h-8 text-[14px]" />

                                            <div className="flex flex-col">
                                                <span className="text-[0.875rem] leading-[140%] text-gray-200">{called.technician.name}</span>
                                                <span className="text-xs leading-[140%] text-gray-300">{called.technician.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Card.Description description="Valores" />
                                            <div className="flex justify-between">
                                                <span className="text-xs leading-[140%] text-gray-200">Preço base</span>
                                                <span className="text-xs leading-[140%] text-gray-200">{formatPrice(called.service.price)}</span>
                                            </div>

                                            {
                                                user?.role === 'TECHNICIAN' && (
                                                    <div className="flex justify-between">
                                                        <span className="text-xs leading-[140%] text-gray-200">Adicionais</span>
                                                        <span className="text-xs leading-[140%] text-gray-200">
                                                            {formatPrice(called.additionalServices.reduce((accumulator, currentValue) => {
                                                                return accumulator + currentValue.price
                                                            }, 0)
                                                            )}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div className="flex flex-col gap-2">

                                            {
                                                user?.role !== 'TECHNICIAN' && (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex justify-between">
                                                            <Card.Description description="Adicionais" />
                                                        </div>
                                                        <div className="flex flex-col">

                                                            {
                                                                called.additionalServices.map((additionalService, i) => {

                                                                    return (
                                                                        <div key={i} className="flex justify-between">
                                                                            <span className="text-xs leading-[140%] text-gray-200">{additionalService.description}</span>
                                                                            <span className="text-xs leading-[140%] text-gray-200">{formatPrice(additionalService.price)}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <Separator />
                                            <div className="flex justify-between font-bold text-[0.875rem] leading-[140%] text-gray-200">
                                                <span>Total</span>
                                                <span> {formatPrice(called.service.price + called.additionalServices.reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue.price
                                                }, 0)
                                                )}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Card.Root>

                            {
                                user?.role === 'TECHNICIAN' && (
                                    <Card.Root className="p-5 lg:p-6 lg:flex-[30rem] max-w-[30rem]">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center">
                                                <Card.Description description="Serviços adicionais" />

                                                <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
                                                    <DialogTrigger asChild>
                                                        {
                                                            called.status !== 'CLOSED' && (
                                                                <Button size={'sm'}>
                                                                    <Plus strokeWidth={3} className="rounded-[5px]" size={14} />
                                                                </Button>
                                                            )
                                                        }
                                                    </DialogTrigger>

                                                    <ServiceModal handleCloseModal={handleCloseAddServiceModal} title="Serviço adicional" />
                                                </Dialog>
                                            </div>

                                            <div>
                                                {
                                                    called.additionalServices.map((addService) => {

                                                        return (
                                                            <div key={addService.id}>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs font-bold leading-[140%] text-gray-200">{addService.description}</span>

                                                                    <div className="flex gap-6 items-center">
                                                                        <span className="text-xs leading-[140%] text-gray-200">{formatPrice(addService.price)}</span>

                                                                        {
                                                                            called.status !== 'CLOSED' && (
                                                                                <Button onClick={() => deleteAdditionalServices(addService.id)} size={'sm'} variant={'secondary'}>
                                                                                    <Trash className="text-red-300" size={14} />
                                                                                </Button>
                                                                            )
                                                                        }
                                                                    </div>

                                                                </div>

                                                                <Separator className="bg-gray-500 my-2" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Card.Root>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}