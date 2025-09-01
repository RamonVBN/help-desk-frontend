'use client'

import { ServiceStatus } from "@/components/pages/servicesPage/serviceStatus"
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Ban, CircleCheck, Plus } from "lucide-react"
import { ServiceModal } from "@/components/serviceModal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getServices, Service } from "@/api/getServices"
import { api } from "@/libs/axios"
import { useState } from "react"
import { EditButton } from "@/components/editButton"

interface ServicesPageTableProps {
    initialServicesData: Service[]
}

export function ServicesPageTable({initialServicesData}: ServicesPageTableProps) {

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [serviceModalTableOpenId, setModalTableOpenId] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const { data: services = initialServicesData } = useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: getServices,

    })

    const { mutate: updateServiceStatus } = useMutation({
        mutationFn: ({ status, serviceId }: { status: 'INACTIVE' | 'ACTIVE', serviceId: string }) => api.patch(`/services/${serviceId}`, {
            status
        }),

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['services'] })
        }
    })

    function handleCloseRegisterServiceModal() {
        setIsRegisterModalOpen(false)
    }

    function handleCloseServiceTableModal() {
        setModalTableOpenId(null)
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            <div className="flex justify-between">
                <h1 className="font-bold text-xl leading-[140%] text-blue-800">Serviços</h1>
                <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-[5px] lg:px-4">
                            <Plus strokeWidth={3} size={18} className="text-gray-600" />
                            <span className="text-[14px] leading-[140%] font-normal text-gray-600 hidden lg:block">Novo</span>
                        </Button>
                    </DialogTrigger>

                    <ServiceModal handleCloseModal={handleCloseRegisterServiceModal} title="Cadastro de serviço" />
                </Dialog>
            </div>

            <div className="border rounded-[10px] lg:overflow-y-auto scrollbar-no-arrows">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Título</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            services?.map((service) => {

                                return (
                                    <TableRow key={service.id}>

                                        <TableCell className="max-w-[65px] truncate lg:max-w-full">
                                            <span className="font-bold text-[0.875rem] leading-[140%] text-gray-200">
                                                {service.name}
                                            </span>
                                        </TableCell>

                                        <TableCell className="lg:w-[200px]">
                                            <span className="text-[0.875rem] leading-[140%] text-gray-200">
                                                {service.price.toLocaleString("pt-BR", {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </span>
                                        </TableCell>

                                        <TableCell className="lg:w-[200px]">

                                            <ServiceStatus status={service.status} />
                                        </TableCell>


                                        <TableCell className="text-right lg:w-[470px]">
                                            <div className="flex gap-2 justify-end items-center">
                                                {
                                                    service.status === 'ACTIVE' ? (
                                                        <Button onClick={() => updateServiceStatus({ status: 'INACTIVE', serviceId: service.id })} variant={'ghost'} className="hover:bg-gray-500">
                                                            <Ban size={14} />
                                                            <span className="hidden md:inline">Desativar</span>
                                                        </Button>
                                                    ) :
                                                        <Button onClick={() => updateServiceStatus({ status: 'ACTIVE', serviceId: service.id })} variant={'ghost'} className="hover:bg-gray-500">
                                                            <CircleCheck size={14} />
                                                            <span className="hidden md:inline">Reativar</span>
                                                        </Button>
                                                }

                                                <Dialog open={serviceModalTableOpenId === service.id} onOpenChange={() => {
                                                    if (!serviceModalTableOpenId) {
                                                        return setModalTableOpenId(service.id)
                                                    } 
                                                    return setModalTableOpenId(null)
                                                }
                                            }
                                                >
                                                    <DialogTrigger asChild>
                                                        <EditButton/>
                                                    </DialogTrigger>

                                                    <ServiceModal handleCloseModal={handleCloseServiceTableModal} title="Serviço" serviceId={service.id} />
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}