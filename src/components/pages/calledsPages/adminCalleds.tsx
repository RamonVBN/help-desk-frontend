'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Avatar } from "@/components/avatar"
import { EditButton } from "@/components/editButton"
import { CalledStatus } from "@/components/pages/calledsPages/components/calledStatus"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getCalleds } from "@/api/clientFetchs/getCalleds"

import { format } from 'date-fns'
import { formatPrice } from "@/utils/formatPrice"
import { Called } from "@/api/types"

interface AdminCalledsProps {
    initialCalledsData: Called[]
}

export function AdminCalleds({ initialCalledsData }: AdminCalledsProps) {

    const { data: calleds = initialCalledsData } = useQuery<Called[]>({
        queryKey: ['calleds'],
        queryFn: getCalleds
    })

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full ">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Chamados</h1>

            <div className="border rounded-[10px] lg:overflow-y-auto scrollbar-no-arrows ">
                <Table >
                    <TableHeader>
                        <TableRow >
                            <TableHead>
                                Atualizado em
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">Id</TableHead>
                            <TableHead>Título e Serviço</TableHead>
                            <TableHead className="hidden lg:table-cell">Valor total</TableHead>
                            <TableHead className="hidden lg:table-cell">Cliente</TableHead>
                            <TableHead className="hidden lg:table-cell">Técnico</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            calleds?.map((called) => {

                                return (
                                    <TableRow key={called.id}>
                                        <TableCell className="whitespace-normal">
                                            <span className="text-xs leading-[140%] text-gray-200 font-bold">{format
                                                (called.updatedAt, "dd/MM/yyyy HH:mm")}</span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell max-w-[6.25rem] truncate 2xl:max-w-full">
                                            <span className="text-xs leading-[140%] text-gray-200 font-extrabold">{called.id}</span>
                                        </TableCell>

                                        <TableCell>
                                            <span className="flex flex-col">
                                                
                                                <span className="text-[0.875rem] leading-[140%] text-gray-200 font-bold 
                                                max-w-[6.25rem] truncate lg:max-w-full">
                                                    {called.title}
                                                </span>


                                                <span className="text-xs leading-[140%] text-gray-200 max-w-[7.5rem] truncate lg:max-w-full">     
                                                    {called.service.name}
                                                </span>
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-[14px] leading-[140%] text-gray-200">
                                                {
                                                    formatPrice(called.service.price + called.additionalServices.reduce((accumulator, currentValue) => {
                                                        return accumulator + currentValue.price
                                                    }, 0))
                                                }
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-[14px] leading-[140%] text-gray-200">
                                                <span className="flex items-center gap-2">
                                                    <Avatar imageUrl={called.client.imageUrl} username={called.client.name} className="w-5 h-5 text-[8.75px]" />
                                                    {called.client.name}
                                                </span>
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-[14px] leading-[140%] text-gray-200 ">
                                                <span className="flex items-center gap-2">
                                                    <Avatar imageUrl={called.technician.imageUrl} username={called.technician.name} className="w-5 h-5 text-[8.75px]" />
                                                    {called.technician.name}
                                                </span>
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <CalledStatus status={called.status} />
                                        </TableCell>

                                        <TableCell>
                                            <Link href={`/calleds/${called.id}`}>
                                                <EditButton />
                                            </Link>
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