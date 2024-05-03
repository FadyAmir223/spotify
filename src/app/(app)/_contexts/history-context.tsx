'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

type Direction = 'back' | 'forward'

type THistoryContext = {
  isFirst: boolean
  isLast: boolean
  handleNavigation: (direction: Direction) => void
}

const HistoryContext = createContext<THistoryContext | null>(null)

type HistoryProviderProps = {
  children: React.ReactNode
}

export default function HistoryProvider({ children }: HistoryProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [history, setHistory] = useState<string[]>([])
  const state = useRef<{ index: number; prevDirection: Direction | '' }>({
    index: 0,
    prevDirection: '',
  })

  useEffect(() => {
    if (state.current.prevDirection) {
      state.current.prevDirection = ''
      return
    }

    setHistory([...history.slice(0, state.current.index + 1), pathname])
    if (history.length) state.current.index += 1
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = (direction: Direction) => {
    if (direction === 'forward') state.current.index += 1
    else if (direction === 'back') state.current.index -= 1
    state.current.prevDirection = direction
    router[direction]()
  }

  return (
    <HistoryContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        handleNavigation,
        isFirst: state.current.index === 0,
        isLast: state.current.index === history.length - 1,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)

  if (!context)
    throw new Error('useHistory should be used within HistoryProvider')

  return context
}
