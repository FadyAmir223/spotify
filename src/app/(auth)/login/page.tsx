import type { Metadata } from 'next'

import H1 from '../_components/h1'
import LoginForm from '../_components/login-form'

export const metadata: Metadata = {
  title: 'login',
  description: 'login to spotify',
}

export default function Login() {
  return (
    <main>
      <H1>Welcome back, Login</H1>

      <LoginForm />
    </main>
  )
}
