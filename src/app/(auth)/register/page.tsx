import type { Metadata } from 'next'

import RegisterForm from '../_components/register-form'

export const metadata: Metadata = {
  title: 'register',
}

export default function Register() {
  return (
    <main>
      <h1 className='mb-6 text-4xl font-bold'>Sign up to start listening</h1>

      <RegisterForm />
    </main>
  )
}
