# isurunuwanthilaka.github.io

Personal Jekyll blog. **Read `README.md` before editing anything** — it has
the run commands, the post front-matter format, the design-system file map,
and two repo-specific gotchas that are easy to get wrong silently:

- **Permalinks**: adding `categories:` to an *existing* post changes its URL
  and breaks every external link to it.
- **Sass**: this compiles with libsass, not Dart Sass — no `@use`; `clamp()`
  needs its fluid middle term wrapped in `calc()` or it errors on mixed units.

Everything else (layout, conventions, design tokens) is in `README.md`, not
duplicated here.
