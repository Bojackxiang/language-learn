import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
  className?: string;
}

const SideBar = ({ className }: Props) => {
  return (
    <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
      SideBar
    </div>
  )
}

export default SideBar