import { createFileRoute } from '@tanstack/react-router'
import InventoryManagement from "@/features/inventory-management"
export const Route = createFileRoute('/_authenticated/inventory-management/')({
  component: InventoryManagement,
})
