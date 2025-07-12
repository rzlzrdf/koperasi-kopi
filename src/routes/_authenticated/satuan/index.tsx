import { createFileRoute } from '@tanstack/react-router'
import Satuan from "@/features/satuan"

export const Route = createFileRoute('/_authenticated/satuan/')({
  component: Satuan,
})
