import ky from 'ky'

import { env } from '@/lib/env'

export default ky.create({ prefixUrl: `${env.NEXT_PUBLIC_SITE_URL}/api` })
