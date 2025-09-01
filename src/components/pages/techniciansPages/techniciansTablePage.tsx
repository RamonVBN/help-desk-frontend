'use client'

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar } from "@/components/avatar";
import Link from "next/link";
import { EditButton } from "@/components/editButton";
import { TableCellHoursAvailable } from "@/components/pages/calledsPages/techCalleds/tableCellHoursAvailable";
import { useQuery } from "@tanstack/react-query";
import { getTechnicians, Technician } from "@/api/clientFetchs/getTechnicians";

interface TechniciansTablePageProps {

    initialTechniciansData: Technician[]
}

export function TechniciansTablePage({initialTechniciansData}: TechniciansTablePageProps) {

    const { data: technicians = initialTechniciansData } = useQuery<Technician[]>({
        queryKey: ['technicians'],
        queryFn: getTechnicians,

    })

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">

            <div className="flex justify-between">
                <h1 className="font-bold text-xl leading-[140%] text-blue-800">Técnicos</h1>
                <Link href={'technicians/new'}>
                    <Button className="rounded-[5px] lg:px-4">
                        <Plus strokeWidth={3} size={18} className="text-gray-600" />
                        <span className="text-[14px] leading-[140%] font-normal text-gray-600 hidden lg:block">Novo</span>
                    </Button>
                </Link>
            </div>

            <div className="border rounded-[10px] lg:overflow-y-auto scrollbar-no-arrows">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Nome</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead>Disponibilidade</TableHead>
                            <TableHead></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            technicians?.map((technician) => {

                                return (
                                    <TableRow key={technician.id} >
                                        <TableCell>
                                            <span className="flex gap-3 items-center">
                                                <Avatar imageUrl={technician.imageUrl} username={technician.name} className="w-7 h-7 text-[12.25px] leading-[140%] tracking-[10%]" />
                                                <span className="font-bold text-[14px] leading-[140%] text-gray-200">{technician.name}</span>
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell">
                                            <span className="text-[14px] leading-[120%] text-gray-200">{technician.email}</span>
                                        </TableCell>

                                        <TableCell className="max-w-10">

                                            <TableCellHoursAvailable className="md:hidden" limit={1} hoursList={technician.technician.availableHours} />
                                            <TableCellHoursAvailable className="hidden md:flex xl:hidden" limit={2} hoursList={technician.technician.availableHours} />
                                            <TableCellHoursAvailable className="hidden xl:flex" limit={4} hoursList={technician.technician.availableHours} />
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Link href={`/technicians/${technician.id}`}>
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