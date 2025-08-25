'use client'

import { Avatar } from "@/components/avatar"

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
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog"

import { PenLine, Trash } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Client, getClients } from "@/utils/getClients"
import { api } from "@/libs/axios"
import { ClientProfileModal } from "@/components/clientProfileModal"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"


export default function Clients() {

    const isSm = useMediaQuery("(min-width: 640px)")

    const [clientTableModalOpenId, setClientTableModalOpenId] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const { data: clients } = useQuery<Client[]>({
        queryKey: ['clients'],
        queryFn: getClients
    })

    const { mutate: deleteClientAccount } = useMutation({
        mutationFn: (clientId: string) => api.delete(`/users/clients/${clientId}`),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['clients'] })
        }
    })

    function handleCloseClientTableModal(){
        setClientTableModalOpenId(null)
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Clientes</h1>

            <div className="border rounded-[10px] lg:overflow-y-auto scrollbar-no-arrows">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Nome</TableHead>
                            <TableHead >Email</TableHead>
                            <TableHead></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            clients?.map((client) => {

                                return (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <span className="flex gap-3 items-center">
                                                <Avatar imageUrl={client.imageUrl} username={client.name} className="w-7 h-7 text-[0.765625rem] leading-[140%] tracking-[10%]" />

                                                <span className="font-bold text-[0.875rem] leading-[140%] text-gray-200">
                                                    {isSm? client.name :  client.name.split('').map((letter, i) => {
                                                        if (i < 8) {
                                                            return letter
                                                        }

                                                        if (i + 1 === client.name.split('').length) {
                                                            return '...'
                                                        }
                                                    })}
                                                </span>
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[0.875rem] leading-[120%] text-gray-200">
                                                {isSm? client.email :  client.email.split('').map((letter, i) => {
                                                        if (i < 12) {
                                                            return letter
                                                        }

                                                        if (i + 1 === client.email.split('').length) {
                                                            return '...'
                                                        }
                                                    })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">

                                            <div className="flex gap-2 justify-end">

                                                <Dialog modal>
                                                    <DialogTrigger asChild>

                                                        <Button variant={'secondary'} size={'sm'} className="rounded-[5px] text-red-300 hover:bg-red-300 hover:text-gray-600 ">
                                                            <Trash size={14}/>
                                                        </Button>
                                                    </DialogTrigger>

                                                    <DialogContent className="p-0 gap-0">
                                                        <DialogHeader className="py-5 px-7">
                                                            <DialogTitle className="mr-auto">Excluir cliente</DialogTitle>
                                                            <DialogDescription className="sr-only">Exclua a conta do cliente.</DialogDescription>
                                                        </DialogHeader>

                                                        <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />

                                                        <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >

                                                            <span className="text-base leading-[140%] text-gray-200">Deseja realmente exluir <span className="font-bold">{client.name}?</span></span>

                                                            <span className="text-base leading-[140%] text-gray-200">Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.</span>


                                                        </div>

                                                        <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />

                                                        <div className="py-6 px-7 flex gap-2">
                                                            <DialogClose asChild>
                                                                <Button variant={'secondary'} className="rounded-[5px] flex-auto">Cancelar</Button>
                                                            </DialogClose>
                                                            <Button onClick={() => deleteClientAccount(client.id)} className="rounded-[5px] flex-auto">Sim, excluir</Button>
                                                        </div>


                                                    </DialogContent>
                                                </Dialog>

                                                <Dialog modal open={clientTableModalOpenId === client.id} onOpenChange={() => {
                                                    if (!clientTableModalOpenId) {
                                                        
                                                        return setClientTableModalOpenId(client.id)
                                                    }
                                                    return setClientTableModalOpenId(null)
                                                }}>
                                                    <DialogTrigger asChild>
                                                        <Button variant={'secondary'} size={'sm'} className="rounded-[5px] hover:bg-gray-200 hover:text-gray-500">
                                                            <PenLine size={14}/>
                                                        </Button>
                                                    </DialogTrigger>

                                                    <ClientProfileModal handleCloseModal={handleCloseClientTableModal} clientId={client.id} />
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