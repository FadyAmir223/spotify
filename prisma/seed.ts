/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const users = [
  { email: 'a@a.com', password: 'a', role: 'LISTENER' },
  { email: 'b@b.com', password: 'b', role: 'ARTIST' },
] as const

async function main() {
  console.log('seeding started...')

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const result = await db.user.upsert({
      where: { email: user.email, password: hashedPassword, role: user.role },
      update: {},
      create: user,
    })

    console.log(`created user with id: ${result.id}`)
  }

  console.log('seeding finished')
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
