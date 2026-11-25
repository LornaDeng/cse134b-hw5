# SSG exercise: shared footer with Eleventy

This separate exercise generates the Home and About pages from Nunjucks templates. Both pages use the same footer include at `src/_includes/footer.njk`.

## Install and build

```sh
npm install
npm run build
```

The generated files are written to `_site/` as `index.html` and `about.html`.

## Preview locally

```sh
npm run preview
```

Open the local URL printed by Eleventy, then visit `/index.html` and `/about.html`. Edit the shared footer once, rebuild, and refresh both pages to see the shared change.
