'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar } from "../../avatar"
import { CalledStatus } from "./components/calledStatus"
import Link from "next/link"
import { Button } from "../../ui/button"
import { Eye, Frown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Called, getCalleds } from "@/api/clientFetchs/getCalleds"
import { formatPrice } from "@/utils/formatPrice"
import { format } from "date-fns"

interface ClientCalledsProps {

    initialCalledsData: Called[]
}

export function ClientCalleds({initialCalledsData}: ClientCalledsProps) {

    const { data: clientCalleds = initialCalledsData } = useQuery<Called[]>({
        queryKey: ['calleds'],
        queryFn: getCalleds,
    })

    if (!clientCalleds) {
        
        return
    }

    if (clientCalleds.length < 1) {
        
        return <div className="w-full flex items-center justify-center gap-2">
            <span className="font-bold text-xl" >Você ainda não criou nenhum chamado</span>
            <Frown size={24}/>
        </div>
    }

    return (
        <div className="flex flex-col w-full gap-4 md:gap-6">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Meus chamados</h1>

            <div className="border rounded-[10px] lg:overflow-y-auto scrollbar-no-arrows">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Atualizado em</TableHead>
                            <TableHead className="hidden lg:table-cell">Id</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead className="hidden lg:table-cell">Serviço</TableHead>
                            <TableHead className="hidden lg:table-cell">Valor total</TableHead>
                            <TableHead className="hidden lg:table-cell">Técnico</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            clientCalleds?.map((called) => {

                                return (
                                    <TableRow key={called.id}>

                                        <TableCell className="whitespace-normal">
                                            <span className="text-xs leading-[140%] text-gray-200 font-bold">{format
                                                (called.updatedAt, "dd/MM/yyyy HH:mm")}</span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell max-w-[100px] truncate 2xl:max-w-full">
                                            <span className="text-xs leading-[140%] text-gray-200 font-extrabold">
                                                {called.id} 
                                            </span>
                                        </TableCell>

                                        <TableCell className="whitespace-normal">
                                            <span className="text-[0.875rem] leading-[140%] text-gray-200 font-bold">{called.title}</span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-[0.875rem] leading-[140%] text-gray-200">{called.service.name}</span>
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

                                        <TableCell className="text-right">
                                            <Link href={`/calleds/${called.id}`}>
                                                <Button size={'sm'} variant={'secondary'}>
                                                    <Eye className="text-gray-200" size={14} />
                                                </Button>
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