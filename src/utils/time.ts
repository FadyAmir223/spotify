export function formatTime(time: number) {
  const HOUR = 3600
  const MIN = 60

  const hours = Math.floor(time / HOUR)
  const minutes = Math.floor((time % HOUR) / MIN)
  const secondes = Math.floor(time % MIN)
    .toString()
    .padStart(2, '0')

  if (hours === 0) return `${minutes}:${secondes}`

  const padMinutes = minutes.toString().padStart(2, '0')
  return `${hours}:${padMinutes}:${secondes}`
}
