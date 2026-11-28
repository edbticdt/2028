# EDBT/ICDT 2028 website, plain HTML

Version {{version}}, packed on {{date}}.

This is the complete website of the 2028 EDBT/ICDT Joint Conference as plain
HTML and CSS, ready to edit by hand and to publish on any web server. It
needs no build tool: open `index.html` in a browser to see it, and edit the
files in any text editor.

It was generated from the Eleventy source at
<https://github.com/edbticdt/2028>. If you keep working on the site for a
long time, that source is easier: the menu and the header are written once
there, and each page is a short Markdown file.

## What is where

| Path | What it holds |
| - | - |
| `*.html` | One file per page, each complete: header, menu, content |
| `css/fonts.css` | The fonts, served from `fonts/` |
| `css/yaml/` | The YAML layout framework (CC-BY 2.0): don't edit, override in `css/site/` |
| `css/site/` | The site's own styles, one file per component; colours and sizes in `tokens.css` |
| `fonts/` | The fonts, with their licences; `humans.txt` names them |
| `images/` | Logos, the cover photo, sponsor logos |
| `humans.txt` | Team, credits and copyrights |

## The pages

| File | Page |
| - | - |
{{pages}}

## Editing by hand

- **A page's text**: edit its `.html` file, between `<div id="col3_content"`
  and the matching `</div>`.
- **The menu and the header** are copied into every page. A change to
  either has to be made in every `.html` file: search and replace across
  the files does it.
- **A new page**: copy an existing page, change its `<title>`, its
  `<meta name="description">` and its content, and add a link to it in the
  menu of every page.
- **Links**: keep them relative (`venue.html`, `images/logo.svg`), never
  starting with `/`, so the site works in any folder, such as
  `https://example.org/2028/`.
- **Fonts and styles** are all local: the site makes no request to another
  server, for privacy (GDPR). Keep it that way.
