import { Button } from "../../../ui/button";
import { Trash, Upload } from "lucide-react";
import { Input } from "../../../input";
import { AvailableHourTag } from "../../../availableHourTag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser} from "@/api/clientFetchs/getUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "../../../avatar";
import { useEffect, useState } from "react";
import { api } from "@/libs/axios";
import { Separator } from "../../../ui/separator";
import { ErrorMessage } from "../../../errorMessage";
import { AxiosError } from "axios";
import { User } from "@/api/types";

interface ProfileDialogProps {
    closeUserDialog: () => void
    changeNewPasswordModal: () => void
}

const profileFormSchema = z.object({
    name: z.string().trim().min(3, { error: 'Digite um nome válido.' }),
    email: z.email({ error: 'Digite um email válido.' }).trim(),
})

type ProfileForm = z.infer<typeof profileFormSchema>

export function ProfileDialog({ changeNewPasswordModal, closeUserDialog }: ProfileDialogProps) {

    const queryClient = useQueryClient()

    const [file, setFile] = useState<File | null>(null)

    const { data: user } = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    const { register, handleSubmit, formState: { errors }, setError } = useForm<ProfileForm>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
        resolver: zodResolver(profileFormSchema)
    })

    const { mutate: uploadProfileImage } = useMutation({
        mutationFn: (file: File) => {

            const fileUploadForm = new FormData()
            fileUploadForm.append("file", file)

            return api.post('/uploads', fileUploadForm)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const { mutate: deleteProfileImage } = useMutation({
        mutationFn: () => api.delete('/uploads'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const { mutate: updateProfile } = useMutation({
        mutationFn: ({ name, email }: { name: string, email: string }) => api.put(`/users/${user?.id}`, {
            name,
            email
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            closeUserDialog()
        },
        onError: (error) => {

            if (error instanceof AxiosError) {

                const message = error.response?.data.message

                setError('root', { type: 'server', message })
            } else {
                setError('root', { type: 'server', message: 'Erro desconhecido' })
            }

        }
    })

    function onSubmit(data: ProfileForm) {
        const { name, email } = data
        updateProfile({ name, email })
    }

    useEffect(() => {
        if (file) {
            uploadProfileImage(file)
        }

        setFile(null)
    }, [file])

    if (!user) {

        return
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Separator />

            <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >
                <div className="flex gap-3 items-center">

                    <Avatar username={user.name} imageUrl={user.imageUrl} className="w-12 h-12" />

                    <div className="flex gap-1">

                        <Button asChild variant={'secondary'} className="text-gray-200">
                            <label htmlFor="uploadProfileImage">
                                <Upload strokeWidth={3} className="size-3.5 text-gray-200" />
                                Nova imagem
                            </label>
                        </Button>

                        <input
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            id="uploadProfileImage"
                            className="sr-only"
                            type="file" />

                        <Button type="button" onClick={() => deleteProfileImage()} variant={'secondary'}>
                            <Trash strokeWidth={3} className="size-3.5 text-red-300" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 ">
                    <div>
                        <Input error={errors.root || errors.name ? true : false} {...register('name')} label="nome" placeholder="Seu nome" />
                        {
                            errors.name && (
                                <ErrorMessage>
                                    {errors.name.message}
                                </ErrorMessage>
                            )
                        }
                    </div>

                    <div>
                        <Input error={errors.root || errors.email ? true : false} {...register('email')} label="e-mail" placeholder="exemplo@email.com" />
                        {
                            errors.email && (
                                <ErrorMessage>
                                    {errors.email.message}
                                </ErrorMessage>
                            )
                        }
                    </div>

                    <div className="relative">
                        <Input error={errors.root ? true : false} defaultValue={'**********'} disabled label="senha" type="password" className="w-[70%]" />

                        <Button
                            type="button"
                            className="absolute top-[10%] left-[80%] md:left-[88%] font-bold text-xs leading-[140%] text-gray-200 rounded-[5px] px-2"
                            variant={'secondary'}
                            size={'sm'}
                            onClick={() => changeNewPasswordModal()}
                        >Alterar</Button>
                    </div>

                    {
                        errors.root && (
                            <ErrorMessage>
                                {errors.root.message}
                            </ErrorMessage>
                        )
                    }
                </div>
            </div >

            <div>
                {
                    user?.role === 'TECHNICIAN' && (
                        <div className="px-7 pb-5 flex flex-col gap-3">

                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold leading-[140%] text-gray-200">Disponibilidade</span>
                                <span className="text-xs leading-[140%] text-gray-300">Horários de atendimento definidos pelo admin</span>
                            </div>

                            <div className="flex flex-row flex-wrap gap-4">
                                {
                                    user.availableHours.map((hour, i) => {
                                        return <AvailableHourTag key={i}>{hour}</AvailableHourTag>
                                    })
                                }

                            </div>
                        </div>
                    )
                }
            </div>

            <Separator />

            <div className="py-6 px-7 flex flex-col">
                <Button type="submit" className="rounded-[5px]">Salvar</Button>
            </div>
        </form>
    )
}