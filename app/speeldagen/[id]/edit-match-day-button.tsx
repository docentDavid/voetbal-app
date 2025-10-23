'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EditMatchDayModal } from './edit-match-day-modal'
import { MatchDayWithDetails } from '@/lib/types/database'

interface EditMatchDayButtonProps {
  matchDay: MatchDayWithDetails
}

export function EditMatchDayButton({ matchDay }: EditMatchDayButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Bewerken
      </Button>
      <EditMatchDayModal
        matchDay={matchDay}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
