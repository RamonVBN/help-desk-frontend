import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Avatar } from "./avatar"
import { Input } from "./input"
import { Button } from "./ui/button"

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/libs/axios"
import { Client } from "@/api/getClients"
import { ErrorMessage } from "./errorMessage"
import { useEffect, useState } from "react"
import { Separator } from "./ui/separator"
import { User } from "@/api/getUser"

const clientProfileFormSchema = z.object({
    name: z.string().trim().min(3, { error: 'Digite um nome válido.' }),
    email: z.email({ error: 'Digite um email válido.' }).trim()
})

type ClientProfileForm = z.infer<typeof clientProfileFormSchema>

interface ClientProfileModal {
    clientId: string
    handleCloseModal: () => void
}

export function ClientProfileModal({ clientId, handleCloseModal }: ClientProfileModal) {

    const queryClient = useQueryClient()

    const {data: client} = useQuery<User>({
        queryKey: ['clients', clientId],
        queryFn: async () => {

            const res = await api.get(`/users/${clientId}`)

            const user = res.data.user

            return user
        }
    })

    const { register, handleSubmit, setValue, reset, formState: { errors }, setFocus } = useForm<ClientProfileForm>({
        resolver: zodResolver(clientProfileFormSchema)
    })

    const { mutate: updateClientAccount } = useMutation({
        mutationFn: ({ name, email }: { name: string, email: string }) => api.put(`/users/${clientId}`, {
            name,
            email
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            handleCloseModal()
        }
    })

    function onSubmit(data: ClientProfileForm) {
        const { name, email } = data
        updateClientAccount({ name, email })
    }

    function allowJustLetters(valorInput: string) {
        return setValue("name", valorInput.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
        // permite letras, acentos e espaços
    }

    useEffect(() => {
        if (client) {
            reset({email: client.email, name: client.name})
        }
    }, [client])

    if (!client) {
        
        return
    }

    return (
        <DialogContent onCloseAutoFocus={() => reset()} onOpenAutoFocus={(e) => e.preventDefault()}  className="p-0 gap-0">
            <DialogHeader className="py-5 px-7">
                <DialogTitle className="mr-auto">Cliente</DialogTitle>
                <DialogDescription className="sr-only">{`Exclua a conta do cliente ${client?.name}`}</DialogDescription>
            </DialogHeader>

            <Separator />

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >
                    <Avatar imageUrl={client.imageUrl} username={client.name} className="w-12 h-12 text-[1.3125rem]" />
                    <div className="flex flex-col gap-4">

                        <div>
                            <Input error={errors.root || errors.name ? true : false} {...register('name')} onChange={(e) => allowJustLetters(e.currentTarget.value)} label="nome" placeholder="Nome do cliente" />
                            {
                                errors.name && (
                                    <ErrorMessage>
                                        {errors.name?.message}
                                    </ErrorMessage>
                                )
                            }
                        </div>

                        <div>
                            <Input error={errors.root || errors.email ? true : false} {...register('email')} label="e-mail" type="email" placeholder="Email do cliente" />
                            {
                                errors.email && (
                                    <ErrorMessage>
                                        {errors.email.message}
                                    </ErrorMessage>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Separator/>


                <div className="py-6 px-7 flex flex-col">

                    <Button type="submit" className="rounded-[5px]">Salvar</Button>

                </div>

            </form>
        </DialogContent>
    )
}