import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Separator } from "@radix-ui/react-separator"
import { Avatar } from "./avatar"
import { Input } from "./input"
import { Button } from "./ui/button"

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/libs/axios"
import { Client } from "@/utils/getClients"
import { ErrorMessage } from "./errorMessage"
import { useEffect, useState } from "react"

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
    const clients = queryClient.getQueryData<Client[]>(['clients'])
    
    const [updatedClient, setUpdatedClient] = useState<Client>()

    const { register, handleSubmit, setValue, reset, formState: { errors }, setFocus,  } = useForm<ClientProfileForm>({
        resolver: zodResolver(clientProfileFormSchema)
    })

    const { mutate: updateClientAccount } = useMutation({
        mutationFn: ({ name, email }: { name: string, email: string }) => api.put(`/users/${updatedClient!.id}`, {
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
        if (clientId && clients) {
            const client = clients.find((currentClient) => currentClient.id === clientId)
            setUpdatedClient(client)
        }

        setFocus('name')
    }, [clientId, clients])

    useEffect(() => {
        if (updatedClient) {
            reset({email: updatedClient.email, name: updatedClient.name})
        }
    }, [updatedClient])

    if (!updatedClient) {
        
        return
    }

    return (
        <DialogContent onCloseAutoFocus={() => reset()} onOpenAutoFocus={(e) => e.preventDefault()}  className="p-0 gap-0">
            <DialogHeader className="py-5 px-7">
                <DialogTitle className="mr-auto">Cliente</DialogTitle>
                <DialogDescription className="sr-only">{`Exclua a conta do cliente ${updatedClient.name}`}</DialogDescription>
            </DialogHeader>

            <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >
                    <Avatar imageUrl={updatedClient.imageUrl} username={updatedClient.name} className="w-12 h-12 text-[1.3125rem]" />
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
                <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />


                <div className="py-6 px-7 flex flex-col">

                    <Button type="submit" className="rounded-[5px]">Salvar</Button>

                </div>

            </form>
        </DialogContent>
    )
}