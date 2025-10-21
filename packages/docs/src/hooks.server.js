import { sequence } from '@sveltejs/kit/hooks'
import { dev } from '$app/environment'

const BASE_URL = 'https://duskmoonui.com'

// Common metadata
const SITE_CONFIG = {
  title: 'duskmoonUI - Free Tailwind CSS Component Library',
  description: 'The most popular, free and open-source component library for Tailwind CSS. Lightweight, modular, and accessible components for modern web applications.',
  keywords: 'Tailwind CSS, components, UI library, free, open-source, web development, CSS framework',
  author: 'duskmoonUI Team',
  image: 'https://img.duskmoonui.com/images/duskmoonui/duskmoonui-logo-192.png',
  url: BASE_URL,
  siteName: 'duskmoonUI',
  type: 'website'
}

function generateMetadata(route, params) {
  const { id, slug } = params

  // Dynamic metadata based on route
  let metadata = { ...SITE_CONFIG }

  if (route?.id?.includes('/docs/[...slug]')) {
    // Documentation pages
    const docTitle = slug?.join(' ') || 'Documentation'
    metadata.title = `${docTitle} - duskmoonUI Documentation`
    metadata.description = `Learn how to use ${docTitle} in duskmoonUI. Comprehensive documentation with examples and best practices.`
    metadata.url = `${BASE_URL}/docs/${slug?.join('/') || ''}`
  } else if (route?.id?.includes('/components/[id]')) {
    // Component pages
    const componentName = id || 'Component'
    metadata.title = `${componentName} Component - duskmoonUI`
    metadata.description = `${componentName} component for Tailwind CSS. Free, accessible, and customizable component implementation.`
    metadata.url = `${BASE_URL}/components/${id}`
    metadata.image = `https://img.duskmoonui.com/components/${id}.png`
  } else if (route?.id?.includes('/blog/[slug]')) {
    // Blog posts
    const blogTitle = slug?.join(' ') || 'Blog Post'
    metadata.title = `${blogTitle} - duskmoonUI Blog`
    metadata.description = `Read about ${blogTitle} on the duskmoonUI blog. Tips, tutorials, and updates for modern web development.`
    metadata.url = `${BASE_URL}/blog/${slug?.join('/') || ''}`
    metadata.type = 'article'
  }

  return metadata
}

function handleSEO({ event, resolve }) {
  const { route, params } = event

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      // Get metadata for current route
      const metadata = generateMetadata(route, params)

      // Generate meta tags
      const metaTags = [
        // Basic meta
        `<title>${metadata.title}</title>`,
        `<meta name="description" content="${metadata.description}" />`,
        `<meta name="keywords" content="${metadata.keywords}" />`,
        `<meta name="author" content="${metadata.author}" />`,

        // Open Graph
        `<meta property="og:title" content="${metadata.title}" />`,
        `<meta property="og:description" content="${metadata.description}" />`,
        `<meta property="og:image" content="${metadata.image}" />`,
        `<meta property="og:url" content="${metadata.url}" />`,
        `<meta property="og:type" content="${metadata.type}" />`,
        `<meta property="og:site_name" content="${metadata.siteName}" />`,

        // Twitter Card
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${metadata.title}" />`,
        `<meta name="twitter:description" content="${metadata.description}" />`,
        `<meta name="twitter:image" content="${metadata.image}" />`,
        `<meta name="twitter:site" content="@duskmoonui" />`,

        // Additional SEO
        `<meta name="robots" content="index, follow" />`,
        `<meta name="googlebot" content="index, follow" />`,
        `<meta name="language" content="English" />`,

        // Canonical URL
        `<link rel="canonical" href="${metadata.url}" />`,

        // JSON-LD structured data
        `<script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "${metadata.siteName}",
          "description": "${metadata.description}",
          "url": "${metadata.url}",
          "image": "${metadata.image}",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "${metadata.url}/docs?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        </script>`
      ].join('\n    ')

      // Insert meta tags after the existing viewport meta tag
      return html.replace(
        /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/,
        `<meta name="viewport" content="width=device-width, initial-scale=1" />
    ${metaTags}`
      )
    }
  })
}

function handleSecurityHeaders({ event, resolve }) {
  return resolve(event, {
    transformPageChunk: ({ html }) => {
      // Add security headers
      const securityMeta = [
        `<meta http-equiv="X-Content-Type-Options" content="nosniff" />`,
        `<meta http-equiv="X-Frame-Options" content="DENY" />`,
        `<meta http-equiv="X-XSS-Protection" content="1; mode=block" />`,
        `<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />`,
        `<meta name="format-detection" content="telephone=no" />`,

        // Content Security Policy
        `<meta http-equiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com www.google-analytics.com;
          style-src 'self' 'unsafe-inline' fonts.googleapis.com;
          font-src 'self' fonts.gstatic.com;
          img-src 'self' data: img.duskmoonui.com www.google-analytics.com;
          connect-src 'self' www.googletagmanager.com www.google-analytics.com;
          frame-src 'none';
          base-uri 'self';
          form-action 'self';
        " />`
      ].join('\n    ')

      return html.replace(
        /<meta name="theme-color" content="oklch\(var\(--b1\)\)" \/>/,
        `<meta name="theme-color" content="oklch(var(--b1))" />
    ${securityMeta}`
      )
    }
  })
}

function handleAnalytics({ event, resolve }) {
  if (dev) {
    return resolve(event)
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      // Add Google Analytics (if needed, though minimal-analytics is already used)
      const analytics = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-10F40JCSMZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-10F40JCSMZ', {
        page_location: window.location.href,
        page_title: document.title
      });
    </script>`

      return html.replace('</head>', `${analytics}\n  </head>`)
    }
  })
}

export const handle = sequence(handleSEO, handleSecurityHeaders, handleAnalytics)