import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog"
import { Separator } from "@radix-ui/react-separator"
import { Input } from "./input"
import { Button } from "./ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getServices, Service } from "@/api/clientFetchs/getServices"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/libs/axios"
import { usePathname } from "next/navigation"
import { AxiosError } from "axios"
import { ErrorMessage } from "./errorMessage"
import { useEffect, useState } from "react"

interface ServiceModalProps {
    serviceId?: string
    title: string
    handleCloseModal: () => void
}

const serviceFormSchema = z.object({
    name: z.string().min(3, { error: 'Digite um nome válido.' }),
    price: z.string().min(1, { error: 'Digite um valor.' })
        .transform((price) => price = price.split('$')[1].trim().replace('.', '').replace(',', '.'))
        .refine((price) => Number(price) >= 1, { error: 'Valor mínimo: R$ 1,00' })
})

type ServiceForm = z.infer<typeof serviceFormSchema>

export function ServiceModal({ serviceId, title, handleCloseModal }: ServiceModalProps) {

    const pathname = usePathname()
    const calledId = pathname.split('/')[2]

    const queryClient = useQueryClient()
    const services = queryClient.getQueryData<Service[]>(['services'])

    const [updatedService, setUpdatedService] = useState<Service>()

    const { register, handleSubmit, setValue, reset, formState: { errors }, setError, setFocus } = useForm<ServiceForm>({
        resolver: zodResolver(serviceFormSchema)
    })

    const { mutate: updateServices } = useMutation({
        mutationFn: ({ name, price }: { name: string, price: string }) => api.put(`/services/${updatedService?.id}`, {
            name,
            price
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            handleCloseModal()
        },
    })

    const { mutate: createServices } = useMutation({
        mutationFn: ({ name, price }: { name: string, price: string }) => api.post('/services', {
            name,
            price
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            handleCloseModal()
        },
    })

    const { mutate: createAdditionalServices } = useMutation({
        mutationFn: ({ name, price }: { name: string, price: string }) => api.post('/additional-services', {
            description: name,
            price,
            calledId: calledId
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['calleds'] })
            handleCloseModal()
        },
        onError(error) {
            if (error instanceof AxiosError) {

                const message = error.response?.data.message

                setError('root', { type: 'server', message })
            } else {
                setError('root', { type: 'server', message: 'Erro desconhecido..' })
            }
        },
    })

    function onSubmit(data: ServiceForm) {

        const { name, price } = data

        if (calledId) {
            createAdditionalServices({ name, price })
        } else {
            if (serviceId) {
                updateServices({ name, price })
            } else {
                createServices({ name, price })
            }
        }
    }

    function allowJustLetters(inputValue: string) {
        return setValue("name", inputValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
        // permite letras, acentos e espaços
    }

    function allowJustNumbersAndFormatToBRL(inputValue: string) {
        const justNumbers = inputValue.replace(/\D/g, "");
        const number = parseFloat(justNumbers) / 100;

        if (isNaN(number)) {
            return setValue("price", "")
        } else {
            return setValue('price', number.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }))
        }


    }

    useEffect(() => {
        if (serviceId && services) {
            const service = services?.find((currentService) => currentService.id === serviceId)
            setUpdatedService(service)
        }

        setFocus('name')
    }, [serviceId, services])

    useEffect(() => {
        if (updatedService) {
            reset({name: updatedService.name, price: updatedService.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})})
        }
    }, [updatedService])

    return (
        <DialogContent onCloseAutoFocus={() => reset()} onOpenAutoFocus={(e) => e.preventDefault()} className="p-0 gap-0">
            <DialogHeader className="py-5 px-7">
                <DialogTitle className="mr-auto">{title}</DialogTitle>
                <DialogDescription className="sr-only">Atualize e crie serviços ou crie serviços adicionais.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />
                <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >
                    <div>
                        <Input error={errors.root || errors.name ? true : false} {...register('name')} onChange={(e) => allowJustLetters(e.currentTarget.value)} label='título' placeholder="Nome do serviço" />
                        {
                            errors.name && (
                                <ErrorMessage>
                                    {errors.name.message}
                                </ErrorMessage>
                            )
                        }
                    </div>
                    <div>
                        <Input error={errors.root || errors.price ? true : false} {...register('price')} onChange={(e) => allowJustNumbersAndFormatToBRL(e.currentTarget.value)} label="valor" placeholder="R$ 0,00" />
                        {
                            errors.price && (
                                <ErrorMessage>
                                    {errors.price.message}
                                </ErrorMessage>
                            )
                        }
                    </div>

                    {
                        errors.root && (
                            <ErrorMessage>
                                {errors
                                    .root.message}
                            </ErrorMessage>
                        )
                    }
                </div>

                <Separator orientation="horizontal" decorative className="bg-gray-500 border-t" />
                <div className="py-6 px-7 flex flex-col">
                    <Button type="submit" className="rounded-[5px]">Salvar</Button>
                </div>
            </form>
        </DialogContent>
    )
}