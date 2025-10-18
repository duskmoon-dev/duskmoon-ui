import { PUBLIC_DUSKMOONUI_API_PATH } from "$env/static/public"
import { error } from "@sveltejs/kit"
import { slugify } from "$lib/util"

export async function entries() {
  // Skip external API calls during CI/build - return empty entries
  if (process.env.CI || !PUBLIC_DUSKMOONUI_API_PATH) {
    return []
  }

  try {
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/api/youtube.json`)
    if (!response.ok) {
      console.warn(`Failed to fetch videos: ${response.status}`)
      return []
    }
    const videos = await response.json()

    return videos.map((video) => ({
      id: `${slugify(video.snippet.title)}-${slugify(video.id)}`
    }))
  } catch (err) {
    console.warn("Error generating video entries:", err.message)
    return []
  }
}

export async function load({ params }) {
  // Skip external API calls during CI/build
  if (process.env.CI || !PUBLIC_DUSKMOONUI_API_PATH) {
    throw error(404, "Video not found")
  }

  try {
    // Fetch videos from API endpoint
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/api/youtube.json`)
    if (!response.ok) {
      throw error(response.status, "Failed to fetch videos")
    }
    const videos = await response.json()

    // Find the specific video
    const video = videos.find(
      (item) => `${slugify(item.snippet.title)}-${slugify(item.id)}` === params.id,
    )

    // If video not found, throw 404
    if (!video) {
      throw error(404, "Video not found")
    }

    // 404 if video is not embeddable
    if (video.status.embeddable === false) {
      throw error(404, "Not found")
    }

    return {
      videos,
      video,
    }
  } catch (err) {
    // Handle any fetch or processing errors
    throw error(500, err.message || "Failed to load video data")
  }
}
