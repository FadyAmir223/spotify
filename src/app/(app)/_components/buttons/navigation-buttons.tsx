import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { Button } from '@/components/ui/button'

import { useHistory } from '../../_contexts/history-context'

export default function NavigationButtons() {
  const { handleNavigation, isFirst, isLast } = useHistory()

  return (
    <div className='hidden items-center gap-2.5 md:flex'>
      <Button
        variant='none'
        className='size-9 rounded-full bg-black p-0.5 transition hover:opacity-75'
        onClick={() => handleNavigation('back')}
        disabled={isFirst}
      >
        <MdKeyboardArrowLeft className='size-7' />
      </Button>

      <Button
        variant='none'
        className='size-9 rounded-full bg-black p-[reset] transition hover:opacity-75'
        onClick={() => handleNavigation('forward')}
        disabled={isLast}
      >
        <MdKeyboardArrowRight className='size-7' />
      </Button>
    </div>
  )
}
