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
  forest: Theme
  black: Theme
  luxury: Theme
  cupcake: Theme
  night: Theme
  dark: Theme
  fantasy: Theme
  coffee: Theme
  lemonade: Theme
  abyss: Theme
  business: Theme
  duskmoon-light: Theme
  valentine: Theme
  pastel: Theme
  aqua: Theme
  autumn: Theme
  cmyk: Theme
  nord: Theme
  duskmoon-dark: Theme
  retro: Theme
  sunset: Theme
  silk: Theme
  caramellatte: Theme
  dracula: Theme
  wireframe: Theme
  lofi: Theme
  emerald: Theme
  winter: Theme
  halloween: Theme
  dim: Theme
  acid: Theme
  garden: Theme
  corporate: Theme
  light: Theme
  synthwave: Theme
  bumblebee: Theme
  cyberpunk: Theme
  [key: string]: Theme
}

declare const themes: Themes
export default themes