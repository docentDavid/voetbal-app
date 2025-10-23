'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreateMatchDayModal } from './create-match-day-modal'

export function CreateMatchDayButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        + Nieuwe speeldag
      </Button>
      <CreateMatchDayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
