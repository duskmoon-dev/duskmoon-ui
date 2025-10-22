import { PUBLIC_DUSKMOONUI_API_PATH } from "$env/static/public"
import yaml from "js-yaml"

async function fetchFrameworksData() {
  // Skip external API calls during CI/build time or if API path is invalid
  if (process.env.CI === 'true' || !PUBLIC_DUSKMOONUI_API_PATH || PUBLIC_DUSKMOONUI_API_PATH.trim() === '') {
    return null
  }
  
  try {
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/data/frameworks.yaml`)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    const yamlFile = await response.text()
    return yaml.load(yamlFile)
  } catch (err) {
    console.error("Error fetching data:", err)
    return null
  }
}

export async function load() {
  const frameworksData = await fetchFrameworksData()
  let testimonials = []
  
  // Skip external API calls during CI/build time
  if (process.env.CI !== 'true') {
    try {
      const testimonialsResponse = await fetch("https://img.duskmoonui.com/generated/testimonials.json")
      if (testimonialsResponse.ok) {
        const data = await testimonialsResponse.json()
        testimonials = Array.isArray(data) ? data : []
      } else {
        console.warn(`Failed to fetch testimonials: ${testimonialsResponse.status}`)
      }
    } catch (error) {
      console.warn(`Error fetching testimonials: ${error.message}`)
    }
  }

  return {
    testimonials: Array.isArray(testimonials) ? testimonials : [],
    frameworksData: frameworksData ? frameworksData.map(({ name, logo }) => ({ name, logo })) : [],
  }
}
