# Workday VNDLY visual regression demo

Static replica of VNDLY screens, an Applitools Eyes regression suite, and a nightly AI review
(Claude + Applitools MCP) that files Jira tickets for real visual bugs.

- `npm start` serves `app/` at http://localhost:4280
- `npx playwright test` runs the Eyes suite (pages and viewports in `tests/pages.js`)
- `.github/workflows/visual-review.yml` runs the suite nightly on `dev` (weekly pre-release on Thursdays) and then the AI reviewer
- `.github/agent/visual-review.md` is the reviewer's policy; `docs/validation-guidelines.md` mirrors the Confluence guidelines
- Tag `eyes-baseline` marks the commit the Eyes baselines were captured from
