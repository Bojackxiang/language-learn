"use client"

import { InfinityIcon, X } from 'lucide-react';
import React from 'react'
import Image from 'next/image'
import { Progress } from './progress';
import { useExitModal } from '@/store/exit-modal';


interface Props {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

const Header = ({
  hearts,
  percentage,
  hasActiveSubscription
}: Props) => {
  const { setOpen } = useExitModal()
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={setOpen}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hasActiveSubscription
          ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
          : hearts
        }
      </div>
    </header>
  )
}

export default Header