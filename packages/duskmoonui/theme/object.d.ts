interface Theme {
  "color-scheme": string
  "--color-base-100": string
  "--color-base-200": string
  "--color-base-300": string
  "--color-base-content": string
  "--color-primary": string
  "--color-primary-content": string
  "--color-secondary": string
  "--color-secondary-content": string
  "--color-accent": string
  "--color-accent-content": string
  "--color-tertiary": string
  "--color-tertiary-content": string
  "--color-neutral": string
  "--color-neutral-content": string
  "--color-info": string
  "--color-info-content": string
  "--color-success": string
  "--color-success-content": string
  "--color-warning": string
  "--color-warning-content": string
  "--color-error": string
  "--color-error-content": string
  "--radius-selector": string
  "--radius-field": string
  "--radius-box": string
  "--size-selector": string
  "--size-field": string
  "--border": string
  "--depth": string
  "--noise": string
}


interface Themes {
  coffee: Theme
  forest: Theme
  aqua: Theme
  black: Theme
  luxury: Theme
  business: Theme
  dark: Theme
  cupcake: Theme
  pastel: Theme
  night: Theme
  abyss: Theme
  caramellatte: Theme
  silk: Theme
  nord: Theme
  fantasy: Theme
  cmyk: Theme
  retro: Theme
  sunset: Theme
  lofi: Theme
  emerald: Theme
  duskmoon-light: Theme
  valentine: Theme
  autumn: Theme
  lemonade: Theme
  dracula: Theme
  duskmoon-dark: Theme
  wireframe: Theme
  winter: Theme
  halloween: Theme
  dim: Theme
  acid: Theme
  garden: Theme
  corporate: Theme
  light: Theme
  cyberpunk: Theme
  synthwave: Theme
  bumblebee: Theme
  [key: string]: Theme
}

declare const themes: Themes
export default themes