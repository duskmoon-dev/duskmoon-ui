import { error } from "@sveltejs/kit"
import { dirname } from "node:path"

export async function entries() {
  // Generate list of all unique tags from blog posts
  const posts = await Promise.all(
    Object.entries(import.meta.glob("./../../[(]posts[)]/*/+page.md")).map(
      async ([path, resolver]) => {
        const { metadata } = await resolver()
        if (!metadata.published) {
          return null
        }
        return metadata.tags || []
      },
    ),
  )

  // Flatten and get unique tags
  const allTags = [...new Set(posts.filter(Boolean).flat())]
  const normalizedTags = allTags.map((tag) => tag.replace(/ /g, "-").toLowerCase())

  return [...new Set(normalizedTags)].map((tag) => ({ tag }))
}

export async function load({ params }) {
  // Explicitly reference params.tag to ensure reactivity
  const currentTag = params.tag

  let posts = await Promise.all(
    Object.entries(import.meta.glob("./../../[(]posts[)]/*/+page.md")).map(
      async ([path, resolver]) => {
        const { metadata } = await resolver()
        const slug = dirname(path).split("/").pop()
        if (!metadata.published) {
          return {}
        }
        return {
          slug,
          ...metadata,
        }
      },
    ),
  )

  // Filter posts by the current tag
  posts = posts.filter((item) => {
    if (!item.tags) return false
    const normalizedTags = item.tags.map((tag) => tag.replace(/ /g, "-").toLowerCase())
    return normalizedTags.includes(currentTag) // Use referenced tag
  })

  posts = posts.filter((obj) => Object.keys(obj).length !== 0)
  posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (posts.length === 0) {
    error(404, "Not found")
  }
  return {
    params: { tag: currentTag }, // Explicitly return the tag
    posts,
  }
}
