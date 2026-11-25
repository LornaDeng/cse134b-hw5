# CSE 134B Homework 5 — Web Components, APIs, and Static Site Generation

Wenqing Deng's HW5 portfolio is based on the HW4 site and adds a Cat Fact Web Component on `projects.html`. The separate `ssg-exercise/` project uses Eleventy to generate two portfolio pages with a shared footer.

## Pages to review

- Main portfolio: `index.html`
- Web Component: `projects.html#cat-facts`
- SSG exercise: `ssg-exercise/` (generated pages: Home and About)

## Design note

A portfolio visitor can explore cat facts without leaving the Projects page. The internal “Get a live cat fact” control sends a GET request to the Cat Fact API, checks the HTTP response and the `fact` field, and places the returned text into the page with `textContent`. While waiting, the panel announces that it is loading; on success it shows the fact and a success status; on failure it explains that the visitor can retry. The external view button toggles the component's observed `compact` attribute, which hides or reveals the detail line. That preference is saved and restored with `localStorage`, while the control still works if storage is unavailable.

The component also has three local sample facts so its DOM controls can be demonstrated without a network request. Its colors use CSS custom properties with fallback values and follow the portfolio's light and dark themes.

## SSG exercise

The Eleventy exercise is in `ssg-exercise/`. It generates `index.html` (Home) and `about.html` (About), both using the shared include `src/_includes/footer.njk`. See `ssg-exercise/README.md` for install, build, and preview commands.

## Local preview

Serve the portfolio root through an HTTP server:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. The API widget needs a network connection to load live data; the sample facts work locally.

## Submission links

- Repository: https://github.com/LornaDeng/cse134b-hw5
- Portfolio: https://lornadeng.github.io/cse134b-hw5/
- Component: https://lornadeng.github.io/cse134b-hw5/projects.html
