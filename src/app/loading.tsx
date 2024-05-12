'use client'

import { BounceLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='grid h-screen place-items-center'>
      <BounceLoader size={40} color='#1db954' />
    </div>
  )
}
