"use client"

import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Input } from "@/components/input"
import { ErrorMessage } from "@/components/errorMessage"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const authFormSchema = z.object({
  name: z.string().min(3, { error: "Digite um nome válido." }).optional(),
  email: z.email({ error: "Digite um e-mail válido." }),
  password: z
    .string()
    .trim()
    .min(6, { error: "A senha precisa ter no mínimo 6 caracteres." })
    .max(16, { error: "A senha só pode ter no máximo 16 caracteres." }),
})

type AuthForm = z.infer<typeof authFormSchema>

export function AuthForm() {
  const pathname = usePathname()

  const router = useRouter()

  const [isLoadingSession, setIsLoadingSession] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<AuthForm>({
    resolver: zodResolver(authFormSchema),
  })

  const { mutate: createSession, isPending: isCreatingSession } = useMutation({
    mutationFn: ({ email, password }: AuthForm) =>
      api.post("/sessions", {
        email,
        password,
      }),
    onSuccess: async () => {
      router.replace("/calleds")
      router.refresh()
    },
    onError(error) {
      setIsLoadingSession(false)
      if (error instanceof AxiosError) {
        const message = error.response?.data.message
        setError("root", { type: "server", message })
      } else {
        setError("root", { type: "server", message: "Erro desconhecido." })
      }
    },
  })

  const { mutate: createUserAccount } = useMutation({
    mutationFn: ({ name, email, password }: AuthForm) =>
      api.post("/users", {
        name,
        email,
        password,
      }),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.replace("/calleds")
      router.refresh()
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message
        setError("root", { type: "server", message })
      } else {
        setError("root", { type: "server", message: "Erro desconhecido." })
      }
    },
  })

  function onSubmit(data: AuthForm) {
    const { name, email, password } = data

    if (name) {
      createUserAccount({ name, email, password })
    } else {
      createSession({ email, password })
    }
  }

  function allowJustLetters(valorInput: string) {
    return setValue("name", valorInput.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
    // permite letras, acentos e espaços
  }

  useEffect(() => {
    if (pathname === "sign-in") {
      setFocus("email")
      return
    }

    setFocus("name")
  }, [])

  useEffect(() => {
    if (isCreatingSession) {
      setIsLoadingSession(true)
    }
  }, [isCreatingSession])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {pathname.includes("sign-up") && (
        <div>
          <Input
            error={errors.email || errors.root ? true : false}
            disabled={isLoadingSession}
            {...register("name")}
            onChange={(e) => allowJustLetters(e.currentTarget.value)}
            label="nome"
            placeholder="Digite seu nome completo"
          />
          {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
        </div>
      )}

      <div>
        <Input
          error={errors.email || errors.root ? true : false}
          disabled={isLoadingSession}
          {...register("email")}
          label="email"
          placeholder="exemplo@email.com"
        />
        {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
      </div>

      <div>
        <Input
          error={errors.password || errors.root ? true : false}
          disabled={isLoadingSession}
          type="password"
          {...register("password")}
          label="senha"
          placeholder="Digite sua senha"
        />
        {errors.password && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}

        {errors.root && <ErrorMessage>{errors.root?.message}</ErrorMessage>}
      </div>

      <Button
        disabled={isLoadingSession}
        type="submit"
        variant={"default"}
        className="disabled:opacity-75 disabled:cursor-progress"
      >
        {isLoadingSession && "Carregando..."}
        {!isLoadingSession && pathname === "/sign-in" && "Entrar"}

        {!isLoadingSession && pathname === "/sign-up" && "Cadastrar-se"}
      </Button>
    </form>
  )
}
