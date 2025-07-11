import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: () => {
    const cookieUser = Cookies.get('user')
    if (cookieUser) {
     throw redirect({ to: '/' })
    }
  },
  component: SignIn,
})
