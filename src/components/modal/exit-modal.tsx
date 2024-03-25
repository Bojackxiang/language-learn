"use client"

import { useExitModal } from '@/store/exit-modal';
import { Dialog } from '@radix-ui/react-dialog';
import React from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {

}

const ExitModal = ({ }: Props) => {
  const { open, setOpen, setClose } = useExitModal();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_sad.svg"
              alt="Mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={setClose}
            >
              Keep learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                setClose();
                router.push("/learn");
              }}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExitModal