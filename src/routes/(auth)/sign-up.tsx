import Cookies from 'js-cookie'
import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/sign-up')({
  beforeLoad: () => {
    const cookieUser = Cookies.get('user')
    if (cookieUser) {
      throw redirect({ to: '/' })
    }
  },
  component: SignUp,
})
