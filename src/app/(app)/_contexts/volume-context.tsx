import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { initVolume } from '@/utils/constants'

type TVolumeContext = {
  volume: number
  setVolume: (value?: number) => void
}

const VolumeContext = createContext<TVolumeContext | null>(null)

type VolumeProviderProps = {
  children: React.ReactNode
}

const volumeName = 'volume'

export default function VolumeProvider({ children }: VolumeProviderProps) {
  const [volume, setVolume] = useState(initVolume)
  const volumeBeforeMute = useRef(volume)

  useEffect(() => {
    const savedVolume = localStorage.getItem(volumeName)
    const parsedVolume = z.coerce.number().safeParse(savedVolume)
    if (!parsedVolume.success) return localStorage.removeItem(volumeName)
    setVolume(parsedVolume.data || initVolume)
  }, [])

  const handleVolumeChange = (value?: number) => {
    setVolume(() => {
      if (value === undefined) {
        const newVolume = volume !== 0 ? 0 : volumeBeforeMute.current
        const roundedVolume = Math.round(newVolume * 10) / 10
        localStorage.setItem(volumeName, roundedVolume.toString())
        return roundedVolume
      }

      const newVolume = Math.min(Math.max(value, 0), 1)
      const roundedVolume = Math.round(newVolume * 10) / 10
      localStorage.setItem(volumeName, roundedVolume.toString())
      if (newVolume !== 0) volumeBeforeMute.current = newVolume
      return roundedVolume
    })
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <VolumeContext.Provider value={{ volume, setVolume: handleVolumeChange }}>
      {children}
    </VolumeContext.Provider>
  )
}

export function useVolume() {
  const context = useContext(VolumeContext)

  if (!context)
    throw new Error('useVolume should be used within VolumeProvider')

  return context
}
