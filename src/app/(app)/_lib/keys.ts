export const keys = {
  song: 'song',
  like: () => [keys.song, 'like'],
  search: (q: string, cursor?: string) => [keys.song, 'search', { q, cursor }],
}
