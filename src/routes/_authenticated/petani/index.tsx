import { createFileRoute } from '@tanstack/react-router'
import Petani from "@/features/petani"
import { Parameter } from '@/features/petani/hooks'


export const Route = createFileRoute('/_authenticated/petani/')({
  component: Petani,
  validateSearch: () => ({}) as Parameter
})
