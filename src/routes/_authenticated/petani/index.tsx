import { createFileRoute } from '@tanstack/react-router'
import Petani from "@/features/petani"

export const Route = createFileRoute('/_authenticated/petani/')({
  component: Petani,
})
