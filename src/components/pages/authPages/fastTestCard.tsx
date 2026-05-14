'use client'

import * as Card from '@/components/card'
import { Button } from '@/components/ui/button'
import { api } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function FastTestCard() {

  const router = useRouter()

  const { mutate: createDemoSession, isPending: isCreatingDemoSession } = useMutation({
    mutationFn: (role: 'ADMIN' | 'CLIENT' | 'TECHNICIAN') =>
      api.post("/sessions/demo", {
        role
      }),
    onSuccess: async () => {
      router.replace("/calleds")
    },
  })

    return (
         <Card.Root className="gap-5">
        <div>
            <Card.Title title="Acesso rápido" className="text-base" />
            <Card.Description description="Entre sem precisar de cadastro" />
        </div>
        <Button disabled={isCreatingDemoSession} variant={'secondary'} onClick={() => createDemoSession('ADMIN')} >
          Acessar como administrador
        </Button>

          <Button disabled={isCreatingDemoSession} onClick={() => createDemoSession('TECHNICIAN')} variant={'secondary'}>
            Acessar como técnico
        </Button>

          <Button disabled={isCreatingDemoSession} onClick={() => createDemoSession('CLIENT')} variant={'secondary'}>
            Acessar como cliente
        </Button>
      </Card.Root>
    )
}