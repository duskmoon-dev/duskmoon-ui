---
title: Install duskmoonUI for UnoCSS
desc: How to install Tailwind CSS and duskmoonUI in a UnoCSS project
---

<script>
  import Translate from "$components/Translate.svelte"
</script>

> :WARNING:
>
> This guide uses The community (unofficial) package [@ameinhardt/unocss-preset-duskmoon](https://github.com/ameinhardt/unocss-preset-duskmoon) as UnoCSS preset for duskmoonUI. <br/>Not all duskmoonUI components are supported yet, some class names may not work as expected.<br/>[See the repo](https://github.com/ameinhardt/unocss-preset-duskmoon) for more information.

### 1. Create a new Vite project

Create a new Vite project in the current directory

```sh:Terminal
npm create vite@latest ./ -- --template vanilla
```

### 2. Install UnoCSS, duskmoonUI and unocss-preset-duskmoon

```sh:Terminal
npm install unocss duskmoonui @ameinhardt/unocss-preset-duskmoon
```

Add UnoCSS to Vite config

```js:vite.config.js
import { defineConfig } from 'vite';
import unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    unocss()
  ],
});
```

### 3. Create a UnoCSS config file

Create a `unocss.config.js` file in the root of your project and add the following code:

```js:unocss.config.js
import { defineConfig } from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import { presetDuskmoon } from "@ameinhardt/unocss-preset-duskmoon";

export default defineConfig({
  content: {
    pipeline: {
      include: ["src/**/*.{js,ts}"],
    },
  },
  presets: [presetDuskmoon(), presetWind4()],
});
```

### 4. Add UnoCSS to your JS file

Add the following code at the top of your `src/main.js` file:

```js:src/main.js
import "@unocss/reset/tailwind.css";
import "uno.css";
```

Now you can use duskmoonUI class names!
