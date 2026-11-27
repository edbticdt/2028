# Adding content

How to add to the site without changing its design. Read this before adding a
page or an entry. What each component is, is in [design.md](design.md); how the
copy should read, in [voice.md](voice.md).

Sections marked (unverified) were found in the site as it stood when this file
was generated: confirm or correct them, then drop the mark.

## Adding a page

The pages today: `src/pages/index.md`, published as `index.html`.

To add one, create `src/pages/<name>.md`, published as `<name>.html`:

```markdown
---
title: Conference Venue
menu_label: Venue
description: Where the conference takes place, and how to get there.
---

# Conference Venue

Text in Markdown.
```

- `title` goes into the browser tab and search results, followed by the
  conference name and city.
- `menu_label` is optional: a shorter name for the menu.
- `description` is optional: the summary search engines and link previews
  show. Without it, the one in `src/_data/site.yaml` is used.

Then add `<name>` to `src/_data/menu.yaml` under its group. The header,
menu and footer come from the layout; a page never repeats them.

The site is served at https://edbticdt.github.io/2028/, under the `/2028/`
path; the organisation root, https://edbticdt.github.io/, is a different
repository. Link to this site's own pages and assets with relative paths
(`venue.html`, `resources/cfp.pdf`), never root-absolute ones (`/venue.html`),
which would point at the organisation site.


