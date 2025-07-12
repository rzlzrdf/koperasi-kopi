import { createFileRoute } from '@tanstack/react-router'
import Lahan from "@/features/lahan"

export const Route = createFileRoute('/_authenticated/lahan/')({
  component: Lahan,
})
