// for recording purpose

export async function sleep(ms?: number) {
  if (process.env.NODE_ENV !== 'production') return

  // eslint-disable-next-line no-param-reassign
  if (!ms) ms = Math.floor(Math.random() * 500) + 1000

  return new Promise((r) => {
    setTimeout(r, ms)
  })
}
