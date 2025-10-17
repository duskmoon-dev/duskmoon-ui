import { stats } from "$lib/data/stats.js"

export async function load() {
  let testimonials = []
  
  // Skip external API calls during CI/build time
  if (process.env.CI !== 'true') {
    try {
      const testimonialsResponse = await fetch("https://img.duskmoonui.com/generated/testimonials.json")
      if (testimonialsResponse.ok) {
        testimonials = await testimonialsResponse.json()
      } else {
        console.warn(`Failed to fetch testimonials: ${testimonialsResponse.status}`)
      }
    } catch (error) {
      console.warn(`Error fetching testimonials: ${error.message}`)
    }
  }
  
  return {
    testimonials,
    stats,
  }
}
