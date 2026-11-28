# Contributing to the EDBT/ICDT 2028 website

The site is published at <https://edbticdt.github.io/2028/>. It is built from
the files in this repository by [Eleventy](https://www.11ty.dev/).

There are two ways to contribute:

- **Editing content** (most organisers): change text, dates, images or the
  menu directly on github.com. You need nothing installed.
- **Working on the site itself** (maintainers): change the layout, the styles
  or the build, on your own computer.

What to change for each kind of edit (a page, the menu, an image, the
dates) is in [docs/adding-content.md](docs/adding-content.md). This file is
about how to send the change.

## How a change goes live

1. You propose the change in a pull request.
2. GitHub builds the site from it. A failed build shows as a red cross on the
   pull request; open **Details** to see the message, which names the file
   and the problem. Nothing is published from a pull request.
3. A maintainer reviews and merges it into `main`.
4. GitHub builds the site again and publishes it, usually within a few
   minutes.

> **Not checked yet:** links inside a page's text that point to a page or
> file that doesn't exist. The menu is checked; page text is not, so far.

## Where things are

| What you want to change | Where it is |
| - | - |
| Year, dates, city, logos, cover photo | `src/_data/site.yaml` |
| The text of a page | its Markdown file in `src/pages/`, such as `src/pages/venue.md` |
| The menu | `src/_data/menu.yaml` |
| Past venues (the edition numbers are counted from them) | `src/_data/history.yaml` |
| Images, logos, the cover photo | `src/images/` |
| Team and copyrights in `humans.txt` | `team` and `copyright_holder` in `src/_data/site.yaml` |
| Layout and styles (maintainers) | `src/_includes/` and `src/css/site/`; read [docs/design.md](docs/design.md) first |

Never edit `_site/`: the build generates it, and it isn't kept in the
repository.

## Editing on github.com

### Changing a file

1. Open the file on github.com, such as `src/pages/venue.md`, and click the
   pencil icon ("Edit this file").
2. Make the change. Pages are Markdown: `#` for headings, `**bold**`, and
   `[link text](https://example.org)` for links. In YAML files (`.yaml`),
   keep the indentation exactly as it is: it carries meaning.
3. Click **Commit changes...** and write a short message saying what changed,
   such as `content(venue): add the venue address`.
4. Choose **Create a new branch for this commit and start a pull request**,
   then **Propose changes**, then **Create pull request**.
5. Wait for the build check on the pull request, then a maintainer reviews
   and merges it.

### Adding a file (a page, an image, a PDF)

1. Open the folder on github.com, such as `src/images/`.
2. Click **Add file**, then **Create new file** for a page, or
   **Upload files** for an image or PDF.
3. Commit it as above, on a new branch with a pull request.

Name files in lowercase, with hyphens and no spaces: `aarhus-harbour.jpg`,
`call-for-papers.pdf`. How to size an image and show it on a page is in
[docs/adding-content.md](docs/adding-content.md), "Images".

Please don't commit straight to `main`, even if GitHub lets you: a pull
request gives someone the chance to catch a mistake before it goes live.

## Working on the site locally

### Setup, once

You need [Node](https://nodejs.org/) 26. With
[fnm](https://github.com/Schniz/fnm), a Node version manager: install it,
and add `eval "$(fnm env --use-on-cd)"` to your shell profile, so it picks
the right Node version when you enter the repository. Then, from the
repository root:

```sh
fnm use      # selects Node 26, from .nvmrc
npm ci       # installs the exact package versions from package-lock.json
```

### Every day

```sh
npm start    # builds the site and serves a live preview
```

`npm start` prints a local address, such as `http://localhost:8080/`: open
it in your browser. The preview rebuilds and reloads on every save. Stop it
with Ctrl+C.

| Command | What it does |
| - | - |
| `npm start` | Builds the site and serves a live preview |
| `npm run build` | Builds the site once into `_site/` |
| `npm run build:pages` | Builds with the `/2028/` prefix, as the deploy does |

If the build fails, the message names the file and the problem: often a
menu entry with no page behind it, or a YAML indentation error.

Everything stays inside the repository: packages go into `node_modules/`
and npm's download cache into `.npm-cache/`, both ignored by git. The
project's `.npmrc` pins exact versions and blocks package install scripts.
Never install with `-g` or run npm with `sudo`.

### Adding or upgrading a package

Keep packages to a minimum: every one is something the next edition's team
has to maintain. Agree any new package with the maintainers first. Then
`npm install --save-dev <package>@<version>`, and commit `package.json` and
`package-lock.json` together, in a commit of their own.

## Commit messages

```
<type>(<scope>): <subject>
```

- **type**: `content` for text, data and images, `fix`, `feat`, `docs`,
  `style`, `build`, `ci`, `chore`
- **scope**: optional, the part of the site, such as `program` or `venue`
- **subject**: imperative and lowercase, with no final period, such as
  `content(venue): add the travel directions`

Keep each commit to one topic.

## Handing over to the next edition

The site is built so that the next edition can reuse it:

1. Copy the repository for the new edition.
2. Update `src/_data/site.yaml`: year, dates, city, logos, cover photo and
   its credit, team, copyright holder.
3. Add the previous edition's city at the end of `joint` in
   `src/_data/history.yaml`. The home page counts the list for the edition
   numbers, so they update by themselves.
4. Replace the content pages in `src/pages/`.
5. Replace the logos and the cover photo in `src/images/`, and move the old
   source files into `archive/`.
6. Remove the menu entries for pages the new edition doesn't have yet. The
   build fails on a menu entry with no page behind it.

The layout and the build need no change.
