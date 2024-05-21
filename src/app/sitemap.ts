import type { MetadataRoute } from 'next'

import { getArtistsCount } from '@/data/user/user'
import { env } from '@/lib/env'
import { SITEMAP_LIMIT } from '@/utils/constants'

// every month 50,000 record may be added to new sitemap file
export const revalidate = 2592000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { NEXT_PUBLIC_SITE_URL: SITE_URL } = env
  const currentDate = new Date().toISOString()

  const count = await getArtistsCount()
  const sitemaps = Math.ceil(count / SITEMAP_LIMIT)

  const artistRecords = Array.from({ length: sitemaps }, (_, i) => ({
    id: i + 1,
  })).map(({ id }) => ({
    url: `${SITE_URL}/artist/sitemap${
      process.env.NODE_ENV === 'production' ? `/${id}.xml` : `.xml/${id}`
    }`,
  }))

  return [
    {
      url: `${SITE_URL}/register`,
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: currentDate,
      changeFrequency: 'daily',
    },
    {
      url: `${SITE_URL}/likes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
    },
    {
      url: `${SITE_URL}/account`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
    },
    ...artistRecords,
  ]
}
