import { PUBLIC_DUSKMOONUI_API_PATH } from "$env/static/public"
import yaml from "js-yaml"

export async function load() {
  // Skip external API calls during CI/build
  if (process.env.CI || !PUBLIC_DUSKMOONUI_API_PATH) {
    return { frameworks: [] }
  }

  try {
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/data/frameworks.yaml`)

    if (!response.ok) {
      throw new Error(`Failed to fetch frameworks: ${response.status}`)
    }

    const yamlFile = await response.text()
    const frameworks = yaml.load(yamlFile)

    return {
      frameworks,
    }
  } catch (error) {
    console.error("Error loading frameworks:", error)
    return {
      frameworks: [],
    }
  }
}
