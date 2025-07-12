import { createFileRoute } from '@tanstack/react-router'
import FarmManagement from "@/features/farm-manangement"

export const Route = createFileRoute('/_authenticated/farm-management/')({
  component: FarmManagement,
})