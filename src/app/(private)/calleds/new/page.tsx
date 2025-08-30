'use client'

import * as Card from '@/components/card'
import { ErrorMessage } from '@/components/errorMessage'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectLabel,
    SelectValue
} from "@/components/ui/select"
import { api } from '@/libs/axios'
import { getServices, Service } from '@/api/getServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

const createCalledFormSchema = z.object({
    title: z.string().trim().min(3, { error: 'Digite um título válido.' }),
    description: z.string().trim().min(1, { error: 'Digite uma descrição válida.' }),
    serviceId: z.uuid({error: 'Selecione uma categoria de serviço.'})
})

type CreateCalledForm = z.infer<typeof createCalledFormSchema>

export default function CreateCalled() {

    const router = useRouter()

    const { register, control, handleSubmit, watch, reset, formState: { errors }, setError, setValue } = useForm<CreateCalledForm>({
        defaultValues: {
            serviceId: undefined
        },
        resolver: zodResolver(createCalledFormSchema)
    })

    const { data: services } = useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: getServices
    })

    const selectedService = services?.find((service) => service.id === watch('serviceId'))

    const { mutate: createCalleds } = useMutation({
        mutationFn: ({ title, description, serviceId }: CreateCalledForm) => api.post('/calleds', {
            title,
            description,
            serviceId
        }),
        onSuccess: () => {
            router.replace('/calleds')
            reset()
        },
        onError(error) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.message

                setError('root', { type: 'server', message })
            } else {
                setError('root', { type: 'server', message: 'Erro desconhecido.' })
            }
        },
    })

    function onSubmit(data: CreateCalledForm) {
        const { title, description, serviceId } = data

        createCalleds({ title, description, serviceId })
    }

    function allowJustLetters(inputValue: string) {
        return setValue("title", inputValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
        // permite letras, acentos e espaços
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="lg:w-[50rem]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-xl leading-[140%] text-blue-800">Novo chamado</h1>

                    <div className='flex flex-col gap-4 lg:flex-row lg:items-start'>
                        <Card.Root className='p-5 lg:flex-[30rem]'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <Card.Title className='text-base' title='Informações' />
                                    <Card.Description description='Configure os dias e horários em que você está disponível para atender chamados' />
                                </div>
                                <form id='createCalledForm' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                    <div>
                                        <Input {...register('title')} onChange={(e) => allowJustLetters(e.currentTarget.value)} error={errors.root || errors.title ? true : false}  label='título' placeholder='Digite um título para o chamado' />
                                        {
                                            errors.title && (
                                                <ErrorMessage>
                                                    {errors.title.message}
                                                </ErrorMessage>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <div
                                            className={`group flex flex-col border-b border-gray-500 
                                            ${(!errors.description && !errors.root) && 'focus-within:border-blue-300'} 
                                            ${(errors.description || errors.root) && 'border-red-300'}`}>

                                            <label
                                                className={`font-bold text-[10px] leading-[140%] text-gray-300 
                                            ${(!errors.description && !errors.root) && 'group-focus-within:text-blue-300'} 
                                            ${(errors.description || errors.root) && 'text-red-300'}`}>
                                                DESCRIÇÃO
                                            </label>

                                            <textarea {...register('description')} placeholder='Descreva o que está acontecendo' className='outline-0 resize-none h-[9.625rem]' />
                                        </div>
                                        {
                                            errors.description && (
                                                <ErrorMessage>
                                                    {errors.description.message}
                                                </ErrorMessage>
                                            )
                                        }
                                    </div>

                                    <Controller
                                        name="serviceId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                // value={field.value}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <div className="group flex flex-col">
                                                    <label htmlFor='selectService' 
                                                    className={`font-bold text-[10px] leading-[140%] text-gray-300 
                                                        ${(!errors.serviceId && !errors.root) && 'group-has-focus-within:text-blue-300'}
                                                        ${(!errors.serviceId && !errors.root) && 'group-has-[button[data-state=open]]:text-blue-300'} 
                                                        ${(errors.serviceId || errors.root) && 'text-red-300'}`}>CATEGORIA DE SERVIÇO</label>

                                                    <SelectTrigger 
                                                    tabIndex={0}
                                                    error={errors.serviceId || errors.root ? true : false} id='selectService' 
                                                    className={`md:text-base leading-[140%] cursor-pointer border-b border-gray-500 rounded-none 
                                                        ${(!errors.serviceId && !errors.root) && 'focus-within:border-blue-300'}
                                                        ${(!errors.serviceId && !errors.root) && 'data-[state=open]:border-blue-300'} 
                                                        ${(errors.serviceId || errors.root ) && 'border-red-300'}`}>
                                                        <SelectValue  className='data-[placeholder]:text-gray-400' placeholder="Selecione a categoria de atendimento" />
                                                    </SelectTrigger>

                                                    <SelectContent sideOffset={10} className='py-4 px-5'>
                                                        <SelectGroup>
                                                            <SelectLabel className='font-bold text-[10px] leading-[140%] tracking-[6%] text-gray-400'>OPÇÕES</SelectLabel>

                                                            {
                                                                services?.map((service) => {
                                                                    if (service.status === 'ACTIVE') {
                                                                        return (
                                                                            <SelectItem key={service.id} className='cursor-pointer data-[state=checked]:font-bold' value={service.id}>{service.name}</SelectItem>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </div>
                                            </Select>
                                        )}
                                    />
                                    {
                                        errors.serviceId && (
                                            <ErrorMessage>
                                                {errors.serviceId.message}
                                            </ErrorMessage>
                                        )
                                    }

                                    {
                                        errors.root && (
                                            <ErrorMessage>
                                                {errors.root.message}
                                            </ErrorMessage>
                                        )
                                    }
                                </form>
                            </div>
                        </Card.Root>
                        <Card.Root className='p-5 flex-[18.5rem]'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <Card.Title className='text-base' title='Resumo' />
                                    <Card.Description description='Valores e detalhes' />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-0.5'>
                                        <Card.Description description='Categoria de serviço' />
                                        <span data-testid="selectedService" className='text-[0.875rem] leading-[140%] text-gray-200 '>
                                            {selectedService?.name ?? ''}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-0.5'>
                                        <Card.Description description='Custo inicial' />
                                        <span className='text-gray-200 leading-[140%] font-bold text-xs'>
                                            R$
                                            <span className='text-base'> {selectedService ? selectedService?.price.toFixed(2).replace('.', ',') : '0,00'}</span>
                                        </span>
                                    </div>
                                </div>
                                <Card.Description description='O chamado será automaticamente atribuído a um técnico disponível' />
                                <Button form='createCalledForm' type='submit' className='rounded-[5px]'>
                                    Criar chamado
                                </Button>
                            </div>
                        </Card.Root>
                    </div>

                </div>
            </div >
        </div >
    )
}