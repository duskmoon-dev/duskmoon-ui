import { pages, pagesThatDontNeedSidebar } from "$lib/data/pages.js"
import { version } from "daisyui/package.json"

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset", "caramellatte", "abyss", "silk"]

export async function load() {
  return {
    pagesThatDontNeedSidebar,
    pages,
    themes,
    duskmoonuiVersion: version,
  }
}
