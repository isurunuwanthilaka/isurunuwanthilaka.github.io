# isurunuwanthilaka.github.io

Personal blog of **Isuru Nuwanthilaka** — engineering notes on AI, distributed
systems and the craft of code. Built with [Jekyll](https://jekyllrb.com) and
published with GitHub Pages at <https://isurunuwanthilaka.github.io>.

## Running it locally

```sh
script/bootstrap   # bundle install
script/server      # http://127.0.0.1:4000 with live reload
script/cibuild     # production build + smoke test
```

## Layout

| Path | What lives there |
| --- | --- |
| `_posts/` | One Markdown file per post, named `YYYY-MM-DD-slug.md` |
| `_layouts/` | `default`, `home`, `page`, `post` |
| `_includes/` | Head, header, footer, icons and post-card partials |
| `_sass/blog/` | The design system (tokens, base, layout, components, post, syntax) |
| `assets/` | Stylesheet entry point, JavaScript, images and favicons |
| `_config.yml` | Site metadata, navigation, author profile and build settings |

## Writing a post

Create `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: "A good, specific title"
tags: [Docker, Go]
description: "One or two sentences — used for the card blurb and the meta description."
image: /assets/img/cover.png   # optional cover, also the Open Graph image
math: true                     # optional, loads KaTeX on this page only
---
```

Only `title` is strictly required; `layout: post` is applied automatically.
`tags` feed the [Topics](https://isurunuwanthilaka.github.io/topics) page, and
`description` is what search engines and social previews show.

### Permalinks

Post URLs follow `/:categories/:year/:month/:day/:title.html` and must stay that
way — every existing link on the internet depends on it. Avoid adding
`categories:` to an existing post, since that changes its URL.

## Design notes

- Light and dark themes are driven by CSS custom properties in
  `_sass/blog/_theme.scss`. Dark mode follows the OS unless the viewer uses the
  toggle, which is remembered in `localStorage`.
- `assets/js/main.js` is progressive enhancement only: theme toggle, mobile nav,
  reading progress, copy buttons, heading anchors and the archive filter. The
  site reads fine without it.
- Sass is compiled by libsass (Jekyll 3.9), so avoid `@use` and keep mixed-unit
  arithmetic such as `clamp()` middle terms inside `calc()`.
