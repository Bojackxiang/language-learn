"use client"

import { Progress as Bar } from '@/components/ui/progress'

interface Props {
  value: number
}

export const Progress = ({
  value
}: Props) => {
  return (
    <Bar value={value} />
  )
}

