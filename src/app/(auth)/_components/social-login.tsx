import GoogleButton from './google-button'

export default function SocialLogin() {
  return (
    <>
      <span className='relative my-4 block h-6 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:bg-black after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-secondary after:px-5 after:content-["or"]' />

      <GoogleButton />
    </>
  )
}
