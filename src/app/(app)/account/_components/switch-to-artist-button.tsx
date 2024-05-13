'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

import PendingButton from '@/components/pending-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { updateListener } from '../_actions/update-listener'

export default function SwitchToArtistButton() {
  const { update } = useSession()
  const [message, dispatchUpdateListener] = useFormState(updateListener, null)
  const [isOpen, setOpen] = useState(false)

  const updateToArtist = async () => {
    await dispatchUpdateListener()
    await update({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>switch to artist</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <p className='mt-1 h-5 text-sm text-red-500'>{message?.error}</p>
        </DialogHeader>

        <DialogFooter className='space-x-4'>
          <form action={updateToArtist}>
            <PendingButton>Yes</PendingButton>
          </form>

          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
