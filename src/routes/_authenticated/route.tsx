import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const cookieUser = Cookies.get('user')
    if (!cookieUser) {
      throw redirect({ to: "/sign-in" })
    }
  },
  component: AuthenticatedLayout,
})

