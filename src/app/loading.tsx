import { BounceLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='grid place-items-center'>
      <BounceLoader size={10} color='#1db954' />
    </div>
  )
}
