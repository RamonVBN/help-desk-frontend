 'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='h-screen w-screen bg-gray-100 text-gray-600 flex items-center justify-center'>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 items-center justify-center'>
          <h2 className='text-2xl'>Algo deu errado!</h2>
          <Frown size={24}/>
        </div>
        <div className='flex gap-2'>
          <Button
          size={'sm'}
          variant={'default'}
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Tente novamente
          </Button>

          <Link href={'/'}>
            <Button size={'sm'} variant={'secondary'}>
              Voltar para HelpDesk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
 
