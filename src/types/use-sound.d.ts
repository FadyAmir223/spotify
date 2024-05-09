declare module 'use-sound' {
  import type { Howl } from 'howler'

  type HookOptions = {
    volume?: number
    playbackRate?: number
    interrupt?: boolean
    soundEnabled?: boolean
    sprite?: { [key: string]: [number, number] }
    onplay?: () => void
    onend?: () => void
    onpause?: () => void
    // ...
  }

  type ExposedData = {
    volume: number
    playbackRate: number
    interrupt: boolean
    soundEnabled: boolean
    sprite: { [key: string]: [number, number] }
    // ...
  }

  type PlayFunction = (options?: PlayOptions) => void

  type PlayOptions = {
    id?: string
    forceSoundEnabled?: boolean
    playbackRate?: number
    // ...
  }

  type PlayExposedData = ExposedData & {
    stop: (id?: string) => void
    pause: (id?: string) => void
    duration: number | null
    sound: Howl | null
  }

  type UseSoundTuple = [PlayFunction, PlayExposedData]

  const useSound: (src: string, options?: HookOptions) => UseSoundTuple

  export default useSound
}
