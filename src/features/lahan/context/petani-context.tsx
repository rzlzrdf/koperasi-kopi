import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { User } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface PetanisContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const PetaniContext = React.createContext<PetanisContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <PetaniContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PetaniContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const petaniContext = React.useContext(PetaniContext)

  if (!petaniContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return petaniContext
}
