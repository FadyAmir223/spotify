import type { Metadata } from 'next'

import H1 from '../_components/h1'
import RegisterForm from '../_components/register-form'

export const metadata: Metadata = {
  title: 'register',
  description: 'create account at spotify',
}

export default function Register() {
  return (
    <main>
      <H1>Sign up to start listening</H1>

      <RegisterForm />
    </main>
  )
}
