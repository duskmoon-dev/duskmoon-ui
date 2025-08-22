---
title: Use duskmoonUI in a Bun dev server
desc: How to use Tailwind CSS and duskmoonUI in a Bun dev server
---

<script>
  import Translate from "$components/Translate.svelte"
</script>

Using Bun 1.2.4+ you can serve HTML and CSS files directly in a [dev server](https://bun.sh/docs/bundler/fullstack). Here's how to setup duskmoonUI for it.

### 1. Create a new Bun project

Create a new Bun project in the current directory

```sh:Terminal
bun init -y
```

### 2. Install bun-plugin-tailwind and duskmoonUI

```sh:Terminal
bun install bun-plugin-tailwind duskmoonui@latest
```

Create a `bunfig.toml` file at root and add bun-plugin-tailwind as a plugin

```toml:bunfig.toml
[serve.static]
plugins = ["bun-plugin-tailwind"]
```

### 3. Add HTML and CSS files

Create `index.html` at root

```html:index.html
<!doctype html>
<html>
  <head>
    <title>duskmoonUI</title>
    <link rel="stylesheet" href="./style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <button class="btn">duskmoonUI Button</button>
  </body>
</html>
```

Create `style.css` at root, add Tailwind CSS and duskmoonUI

```postcss:style.css
@import "tailwindcss";
@plugin "duskmoonui";
```

## Serve the HTML file

```sh:Terminal
bun index.html
```

Now you can use duskmoonUI class names!
