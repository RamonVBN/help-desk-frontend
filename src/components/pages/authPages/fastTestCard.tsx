'use client'

import * as Card from '@/components/card'
import { Button } from '@/components/ui/button'
import { api } from '@/libs/axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function FastTestCard() {

  const [isLoadingDemoSession, setIsLoadingDemoSession] = useState(false)

  const router = useRouter()

  const { mutate: createDemoSession } = useMutation({
    mutationFn: (role: 'ADMIN' | 'CLIENT' | 'TECHNICIAN') =>
      api.post("/sessions/demo", {
        role
      }),
    onMutate: () => {
      setIsLoadingDemoSession(true)
    },
    onError: () => {
      setIsLoadingDemoSession(false)
    },
    onSuccess: async () => {
      router.replace("/calleds")
    },
  })

    return (
        <Card.Root className="gap-5 mb-3 md:mb-0">
          <div>
              <Card.Title title="Acesso rápido" className="text-base" />
              <Card.Description description="Entre sem precisar de cadastro" />
          </div>
          <Button disabled={isLoadingDemoSession} variant={'secondary'} onClick={() => createDemoSession('ADMIN')} >
            Acessar como administrador
          </Button>

            <Button disabled={isLoadingDemoSession} onClick={() => createDemoSession('TECHNICIAN')} variant={'secondary'}>
              Acessar como técnico
          </Button>

            <Button disabled={isLoadingDemoSession} onClick={() => createDemoSession('CLIENT')} variant={'secondary'}>
              Acessar como cliente
          </Button>
      </Card.Root>
    )
}