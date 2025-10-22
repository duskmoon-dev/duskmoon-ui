import { PUBLIC_DUSKMOONUI_API_PATH } from "$env/static/public"
import { error } from "@sveltejs/kit"
import * as sitemap from "super-sitemap"
import yaml from "js-yaml"

export const prerender = true

const fetchProductIds = async () => {
  // Skip fetching if API path is empty (CI build)
  if (!PUBLIC_DUSKMOONUI_API_PATH || PUBLIC_DUSKMOONUI_API_PATH.trim() === '') {
    console.warn("Skipping store data fetch - no API path provided (CI mode)")
    return []
  }
  
  try {
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/data/store.yaml`)

    if (!response.ok) {
      console.warn(`Failed to fetch store data: ${response.status}`)
      return []
    }

    const yamlText = await response.text()
    const yamlData = yaml.load(yamlText)

    return yamlData?.productCustomAttributes?.map((product) => String(product.id)) ?? []
  } catch (err) {
    console.warn("Error fetching or processing store data:", err.message)
    return []
  }
}

const fetchCompareData = async () => {
  // Skip fetching if API path is empty (CI build)
  if (!PUBLIC_DUSKMOONUI_API_PATH || PUBLIC_DUSKMOONUI_API_PATH.trim() === '') {
    console.warn("Skipping compare data fetch - no API path provided (CI mode)")
    return {}
  }
  
  try {
    const response = await fetch(`${PUBLIC_DUSKMOONUI_API_PATH}/data/compare.yaml`)

    if (!response.ok) {
      console.warn(`Failed to fetch compare data: ${response.status}`)
      return {}
    }

    const yamlFile = await response.text()
    const yamlData = yaml.load(yamlFile)
    return yamlData?.data ?? {}
  } catch (err) {
    console.warn("Error fetching or parsing compare data:", err.message)
    return {}
  }
}

const generateCompareSlugs = (frameworks = []) =>
  frameworks.flatMap((f1) => frameworks.filter((f2) => f1 !== f2).map((f2) => `${f1}-vs-${f2}`))

const generateAlternativeSlugs = (frameworks = []) =>
  frameworks.filter((key) => key !== "duskmoonui")

const processPath = (entry) => {
  const updatedEntry = { ...entry, path: entry.path === "/" ? entry.path : `${entry.path}/` }

  if (updatedEntry.alternates) {
    updatedEntry.alternates = updatedEntry.alternates.map((alt) => ({
      ...alt,
      path: alt.path === "/" ? alt.path : `${alt.path}/`,
    }))
  }
  return updatedEntry
}

// Function to get component slugs from component directories
const getComponentSlugs = async () => {
  try {
    // The super-sitemap library should automatically handle the component directories
    // since they are actual directories, not dynamic routes
    return []
  } catch (err) {
    console.warn("Error loading component slugs:", err.message)
    return []
  }
}

export const GET = async () => {
  let productIds = []
  let comparePages = []
  let alternativeLibraries = []
  let componentSlugs = []

  try {
    const compareData = await fetchCompareData()
    const frameworks = Object.keys(compareData)

    comparePages = generateCompareSlugs(frameworks)
    alternativeLibraries = generateAlternativeSlugs(frameworks)
    productIds = await fetchProductIds()
    componentSlugs = await getComponentSlugs()
  } catch (err) {
    console.warn("Could not load some data for sitemap, using fallback:", err.message)
    // Use empty arrays as fallback
    comparePages = []
    alternativeLibraries = []
    productIds = []
    componentSlugs = []
  }

  return await sitemap.response({
    origin: "https://duskmoonui.com",
    additionalPaths: [
      "/llms.txt",
      "/docs/",
      "/components/",
      "/blog/",
      "/store/",
      "/resources/"
    ],
    excludeRoutePatterns: [
      ".*\\/design$",
      ".*\\/accessibility$",
      ".*\\/checkout$",
      "/blog/tag/",
      "/resources/videos/",
    ],
    paramValues: {
      "/store/[productId]": productIds,
      "/compare/[item]": comparePages,
      "/alternative/[library]": alternativeLibraries,
    },
    processPaths: (paths) => paths.map(processPath),
  })
}
