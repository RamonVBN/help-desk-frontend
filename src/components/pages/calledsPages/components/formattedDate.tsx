'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'

interface FormattedDateProps {
  date: string | Date
}

export function FormattedDate({ date }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    setFormattedDate(
      format(new Date(date), 'dd/MM/yyyy HH:mm')
    )
  }, [date])

  return (
    <span className="text-xs leading-[140%] text-gray-200 font-bold">
      {formattedDate}
    </span>
  )
}