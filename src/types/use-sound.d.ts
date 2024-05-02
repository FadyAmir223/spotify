declare module 'use-sound' {
  type PlayOptions = {
    id?: string
    forceSoundEnabled?: boolean
    playbackRate?: number
  }

  type Howl = {
    play: () => void
    unload: () => void
  }

  type UseSoundFunction = (
    path: string | undefined,
    options?: {
      volume?: number
      playbackRate?: number
      interrupt?: boolean
      soundEnabled?: boolean
      sprite?: SpriteMap
      onplay?: () => void
      onpause?: () => void
    },
  ) => [
    play: (options?: PlayOptions) => void,
    {
      stop: (id?: string) => void
      pause: (id?: string) => void
      duration: number | null
      sound: null | Howl
    },
  ]

  const useSound: UseSoundFunction
  export default useSound
}
