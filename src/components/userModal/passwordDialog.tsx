import { Button } from "../ui/button";
import { Input } from "../input";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/axios";
import { getUser, User } from "@/api/getUser";
import { ErrorMessage } from "../errorMessage";
import { AxiosError } from "axios";

interface PasswordDialogProps {
    closeUserDialog: () => void
}

const passwordDialogFormSchema = z.object({
    currentPassword: z.string()
        .min(6, { error: 'A senha tem no mínimo 6 caracteres.' })
        .max(16, { error: 'A senha tem no máximo 16 caracteres' })
        .trim(),
    newPassword: z.string()
        .min(6, { error: 'A senha deve ter no mínimo 6 caracteres.' })
        .max(16, { error: 'A senha deve ter no máximo 16 caracteres' })
        .trim()
})

type PasswordDialogForm = z.infer<typeof passwordDialogFormSchema>

export function PasswordDialog({ closeUserDialog }: PasswordDialogProps) {

    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, setError } = useForm<PasswordDialogForm>({
        resolver: zodResolver(passwordDialogFormSchema)
    })

    const { data: user } = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    const { mutate: updatePassword } = useMutation({
        mutationFn: ({ currentPassword, newPassword }: { currentPassword: string, newPassword: string }) => api.put(`/users/${user?.id}`, {
            currentPassword,
            newPassword
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

    function onSubmit(data: PasswordDialogForm) {

        const { currentPassword, newPassword } = data
        updatePassword({ currentPassword, newPassword })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Separator />

            <div className="pb-8 pt-7 px-7 flex flex-col gap-5" >

                <div className="flex flex-col gap-4 ">
                    <div>
                        <Input error={errors.currentPassword || errors.root ? true : false} {...register('currentPassword')} type="password" label="Senha Atual" placeholder="Digite sua senha atual" />
                        {
                            errors.currentPassword && (
                                <ErrorMessage>
                                    {errors.currentPassword.message}
                                </ErrorMessage>
                            )
                        }
                    </div>

                    <div>
                        <Input error={errors.newPassword || errors.root ? true : false} {...register('newPassword')} type="password" label="Nova Senha" placeholder="Digite sua nova senha" />

                        {
                            errors.newPassword ? (
                                <ErrorMessage>
                                    {errors.newPassword.message}
                                </ErrorMessage>
                            ) :

                                <span className="text-xs italic leading-[140%] text-gray-400">Mínimo de 6 digitos</span>
                        }
                    </div>
                </div>
                {
                    errors.root && (
                        <ErrorMessage>
                            {errors.root.message}
                        </ErrorMessage>
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