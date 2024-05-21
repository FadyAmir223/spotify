import type { MetadataRoute } from 'next'

import { getArtists, getArtistsCount } from '@/data/user/user'
import { env } from '@/lib/env'
import { SITEMAP_LIMIT } from '@/utils/constants'

export const revalidate = 3600

export async function generateSitemaps() {
  const count = await getArtistsCount()
  const sitemaps = Math.ceil(count / SITEMAP_LIMIT)

  return Array.from({ length: sitemaps }, (_, i) => ({ id: i + 1 }))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const artists = await getArtists(id)

  return artists.map((artist) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}/artist/${artist.id}`,
    lastModified: new Date().toISOString(),
  }))
}
