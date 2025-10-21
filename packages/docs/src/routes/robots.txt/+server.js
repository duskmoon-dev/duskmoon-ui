import { dev } from '$app/environment'

const BASE_URL = 'https://duskmoonui.com'

export const prerender = true

export function GET() {
  // Enhanced robots.txt for better SEO
  const robotsContent = dev
    ? // Development robots.txt - block all indexing
      `User-agent: *
Disallow: /

# This is a development environment - please do not index
`
    : // Production robots.txt - optimized for SEO
      `User-agent: *
Allow: /

# Allow all important pages
Allow: /docs/
Allow: /components/
Allow: /blog/
Allow: /store/
Allow: /resources/

# Disallow admin/utility pages
Disallow: /admin/
Disallow: /api/
Disallow: /design
Disallow: /accessibility
Disallow: /checkout
Disallow: /*-component-library/
Disallow: /theme-generator/

# Disallow blog tags (avoid duplicate content issues)
Disallow: /blog/tag/

# Disallow resource videos (lower priority)
Disallow: /resources/videos/

# Disallow temporary/internal pages
Disallow: /temp/
Disallow: /test/
Disallow: /_drafts/

# Allow sitemap files
Allow: /sitemap.xml
Allow: /llms.txt

# Crawl-delay (optional - remove if you don't want delays)
Crawl-delay: 1

# Site-specific rules
# Google (allow enhanced crawling)
User-agent: Googlebot
Allow: /

# Google Images
User-agent: Googlebot-Image
Allow: /images/
Allow: /components/*/*.png
Allow: /components/*/*.jpg
Allow: /components/*/*.webp

# Google News (if you have news content)
User-agent: Googlebot-News
Allow: /blog/

# Common crawlers
User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Block unwanted crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: dotbot
Disallow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}