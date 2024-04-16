/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const users = [
  { email: 'fezza@gmail.com', name: 'fezza' },
  { email: 'jessy@gmail.com', name: 'jessy' },
  { email: 'petra@gmail.com', name: 'petra' },
]

async function main() {
  console.log(`Start seeding ...`)

  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    const result = await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })

    console.log(`Created event with id: ${result.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
