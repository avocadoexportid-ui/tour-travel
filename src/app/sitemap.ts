import { MetadataRoute } from 'next'
import { tours } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const tourEntries = tours.map((tour) => ({
    url: `https://jelajahnusantara.com/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://jelajahnusantara.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://jelajahnusantara.com/tours', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...tourEntries,
  ]
}
