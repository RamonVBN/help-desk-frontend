'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

import * as Card from '@/components/card'
import { Avatar } from "@/components/avatar";

import { Input } from "@/components/input";

import { HoursSelect } from "@/components/hoursSelect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTechnicians, Technician } from "@/utils/getTechnicians";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/libs/axios";
import { AxiosError } from "axios";
import { ErrorMessage } from "./errorMessage";


const technicianBaseProfileFormSchema = z.object({
    name: z.string().min(3, { error: 'Digite um nome válido.' }),
    email: z.email({ error: 'Digite um email válido.' }),
    availableHours: z.array(z.string()).nonempty({ error: 'Selecione os horários de atendimento.' }),
    password: z.string().min(6).or(z.literal("")).optional()
})

const createTechnicianProfileFormSchema = technicianBaseProfileFormSchema.extend({
    password: z.string().min(6, { error: 'A senha precisa ter no mínimo 6 caracteres.' }),
    role: z.enum(['TECHNICIAN'])
})

type TechnicianUpdateProfileForm = z.infer<typeof technicianBaseProfileFormSchema>
type TechnicianCreateProfileForm = z.infer<typeof createTechnicianProfileFormSchema>

interface TechnicianProfileFormProps {
    mode: 'create' | 'update'
}

export function TechnicianProfilePage({ mode }: TechnicianProfileFormProps) {

    const schema = mode === 'create' ? createTechnicianProfileFormSchema : technicianBaseProfileFormSchema

    const router = useRouter()

    const queryClient = useQueryClient()

    const params = useParams()

    const techId = params.id

    const { data: technicians } = useQuery<Technician[]>({
        queryKey: ['technicians'],
        queryFn: getTechnicians
    })

    const technician = technicians?.find((tech) => tech.id === techId)

    const { register, handleSubmit, control, setValue, formState: { errors }, setError } = useForm<TechnicianUpdateProfileForm | TechnicianCreateProfileForm>({
        defaultValues: {
            name: technician ? technician.name : '',
            email: technician ? technician.email : '',
            availableHours: technician ? technician.technician.availableHours : [],
            password: technician && schema === createTechnicianProfileFormSchema ? '123456' : '',
            role: 'TECHNICIAN'
        },
        resolver: zodResolver(schema)
    })

    const { mutate: updateTechProfile } = useMutation({
        mutationFn: ({ name, email, availableHours }: TechnicianUpdateProfileForm) => api.put(`/users/${techId}`, {
            name,
            email,
            availableHours
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['technicians'] })
            router.push('/technicians')
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

    const { mutate: createTechProfile } = useMutation({
        mutationFn: ({ name, email, password, role, availableHours }: TechnicianCreateProfileForm) => api.post('/users', {
            name,
            email,
            password,
            role,
            availableHours
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['technicians'] })
            router.push('/technicians')
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

    function onSubmit(data: TechnicianUpdateProfileForm | TechnicianCreateProfileForm) {

        if (techId) {
            const { name, email, availableHours } = data
            updateTechProfile({ name, email, availableHours })
        } else {
            const { name, email, password, availableHours } = data

            if (!password) {

                return
            }

            createTechProfile({ name, email, password, role: 'TECHNICIAN', availableHours })
        }
    }

    function allowJustLetters(valorInput: string) {
        return setValue("name", valorInput.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
        // permite letras, acentos e espaços
    }

    return (
        <div className="w-full flex flex-col lg:items-center">
            <div className="lg:w-[50rem]">

                <Link href={'/technicians'} className="flex gap-2 items-center font-bold text-xs leading-[140%] text-gray-300">
                    <Button variant={'ghost'} className="p-2 mr-auto">
                        <ArrowLeft size={14} />
                        Voltar
                    </Button>
                </Link>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 lg:gap-6">

                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between ">
                            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Perfil de técnico</h1>

                            <div className="flex gap-2 w-full lg:max-w-[20.875rem] justify-end">

                                <Link className="flex-[1_1_20.875rem] lg:flex-initial" href={'/technicians'}>
                                    <Button type="button" className="rounded-[5px] w-full ">
                                        Cancelar
                                    </Button>
                                </Link>

                                <Button type="submit" variant={'secondary'} className="rounded-[5px] flex-[1_1_20.875rem] lg:flex-initial">
                                    Salvar
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row lg:items-start">

                            <Card.Root className="p-5 lg:p-6 flex gap-5 lg:flex-[18.5rem]">
                                <div>
                                    <Card.Title title="Dados Pessoais" className="text-base leading-[140%]" />
                                    <Card.Description description="Defina as informações do perfil de técnico" />
                                </div>

                                <div className="flex flex-col gap-4">

                                    {
                                        techId && technician && (
                                            <Avatar imageUrl={technician.imageUrl} username={technician.name} className="w-12 h-12 text-[1.3125rem]" />
                                        )
                                    }

                                    <div>
                                        <Input error={errors.root || errors.name ? true : false} {...register('name')} onChange={(e) => allowJustLetters(e.currentTarget.value)} label="NOME" placeholder="Nome completo" />
                                        {
                                            errors.name && (
                                                <ErrorMessage>
                                                    {errors.name.message}
                                                </ErrorMessage>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <Input error={errors.root || errors.email ? true : false} {...register('email')} label="E-MAIL" placeholder="exemplo@mail.com" />
                                        {
                                            errors.email && (
                                                <ErrorMessage>
                                                    {errors.email.message}
                                                </ErrorMessage>
                                            )
                                        }
                                    </div>

                                    {
                                        !techId && (
                                            <div>
                                                <Input error={errors.root || errors.password ? true : false} {...register('password')} label="SENHA" placeholder="Defina a senha de acesso" type="password" />
                                                {
                                                    errors.password ? (
                                                        <ErrorMessage>
                                                            {errors.password.message}
                                                        </ErrorMessage>
                                                    ) :
                                                        (
                                                            <span className="text-xs italic leading-[140%] text-gray-400">Mínimo de 6 digitos</span>
                                                        )
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        errors.root && (
                                            <ErrorMessage>
                                                {errors.root.message}
                                            </ErrorMessage>
                                        )
                                    }

                                </div>
                            </Card.Root>

                            <Card.Root className="p-5 lg:p-6 flex gap-5 lg:flex-[30rem]">
                                <div>
                                    <Card.Title title="Horários de atendimento" className="text-base leading-[140%]" />
                                    <Card.Description description="Selecione os horários de disponibilidade do técnico para atendimento" />
                                </div>

                                <Controller
                                    name="availableHours"
                                    control={control}
                                    render={({ field }) => (
                                        <HoursSelect value={field.value} onChange={field.onChange} />
                                    )}
                                />
                                {
                                    errors.availableHours && (
                                        <ErrorMessage>
                                            {errors.availableHours.message}
                                        </ErrorMessage>
                                    )
                                }
                            </Card.Root>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}