# EDBT/ICDT 2028

Website of the 2028 EDBT/ICDT Joint Conference, held in Aarhus, Denmark.
Published at <https://edbticdt.github.io/2028/>.

The site is built with [Eleventy](https://www.11ty.dev/) from Markdown pages
and YAML data files, and works without JavaScript.

## Which guide to read

| You want to | Read |
| - | - |
| Change text, dates, images or the menu | [docs/adding-content.md](docs/adding-content.md) |
| Know how to send a change (on github.com or locally) | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Change the layout, colours or fonts | [docs/design.md](docs/design.md) |
| Write copy in the site's voice | [docs/voice.md](docs/voice.md) |
| Set up the site for the next edition | [CONTRIBUTING.md](CONTRIBUTING.md), "Handing over to the next edition" |

## Quick start

Editing on github.com needs nothing installed. To preview the site on your
own computer, you need Node 26, through [fnm](https://github.com/Schniz/fnm)
or another version manager:

```sh
fnm use      # Node 26, from .nvmrc
npm ci       # the exact packages from package-lock.json, into node_modules/
npm start    # builds the site and serves a live preview
```

Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## Assets

What each path holds and who edits it. Web assets make the site work,
content assets are what it shows, and doc assets describe it. Only the built
site, `_site/`, is published: the build takes its pages and files from `src/`
alone, so nothing outside `src/` can be published by mistake.

| Path | Kind | Edited by | Notes |
| - | - | - | - |
| `src/pages/` | content | organisers | one Markdown file per page; `venue.md` is published as `venue.html` |
| `src/_data/` | content | organisers | `site.yaml` (edition settings), `menu.yaml`, `news.yaml`, `sponsors.yaml`, `history.yaml` (past venues); `pkg.js` is build code |
| `src/images/` | content | organisers | logos in `logos/`, the cover photo in `cover/` |
| `src/_includes/` | web | maintainer | the page layout and its parts |
| `src/css/` | web | maintainer | `yaml/` is the inherited framework, never edited; `site/` is this site's own |
| `src/fonts/` | web | maintainer | Source Serif 4 and Fira Sans, with their licences, served by the site itself |
| `src/humans.njk` | web | maintainer | generates `humans.txt`: team, credits, copyrights |
| `eleventy.config.js`, `package.json`, `package-lock.json`, `.nvmrc`, `.npmrc` | web | maintainer | the build; not published |
| `_site/` | web | nobody | the built site, generated, not in git |
| `archive/` | doc | maintainer | source files kept for reference, such as the logo PDF |
| `docs/` | doc | maintainer | the guides |
| `README.md`, `CONTRIBUTING.md` | doc | maintainer | this file, and how to send a change |
| `.github/workflows/pages.yml` | web | maintainer | builds the site on every pull request, and publishes it on every push to `main` |
