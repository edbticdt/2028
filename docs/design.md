# Design

The site's visual system first, then the components built on it. Read this
before changing markup or styles.

The look is the one of the 2026 and 2027 editions: a white page with rounded
corners on a dark red background, at most 1080px wide, the conference name in
red, a menu column on the left with the same groups as 2027, and the content
on the right. On phones, the page becomes one
column: content first, the menu after it, with a "Menu" link at the top to
jump there.

## Style guide

### Stylesheets

All in `src/css/`, linked in this order by `src/_includes/base.njk`:

| File | What it holds | Edit it? |
| - | - | - |
| `fonts.css` | The `@font-face` rules for the local fonts | Only to add or change a font |
| `yaml/layout.css` | The YAML framework 3.3, which imports `base.css`, `nav_vlist.css`, `basemod.css`, `content.css` and `print_draft.css` | **Never**: CC-BY 2.0, kept as the 2026 and 2027 sites had it |
| `site/tokens.css` | Colours and sizes, as custom properties | Yes, to retune the look |
| `site/typography.css` | Text size, line height, headings and links in the content column | Yes |
| `site/frame.css` | The page frame, its 1080px width cap, and the phone layout | Yes |
| `site/header.css` | The header and the phone "Menu" link | Yes |
| `site/menu.css` | The menu's fonts and sizes, on top of the framework's look | Yes |
| `site/content.css` | Images, tables and notes in the content column | Yes |
| `site/cover.css` | The cover photo on the home page and its credit | Yes |
| `site/home.css` | The home page's welcome line, sponsor logos and news list | Yes |
| `site/back-to-top.css` | The back-to-top button | Yes |

A vendored stylesheet is replaced with a newer release, never edited. Changes
go in `site/`, which loads after the framework and overrides it.

To add a component: create `src/css/site/<component>.css`, starting with a
comment saying what it styles, use the values from `tokens.css`, put its
phone rules at the bottom of the same file, and add its `<link>` to
`base.njk` after the other `site/` files.

### Custom properties

In `src/css/site/tokens.css`:

| Property | Value | Used for |
| - | - | - |
| `--color-page-background` | `#901a1e` | The red around the page |
| `--color-heading` | `rgb(204, 0, 0)` | Site name, page headings |
| `--color-text` | `#444` | Body text |
| `--color-border` | `#ddd` | Dividers |
| `--color-active` | `#800` | Current menu item, the phone "Menu" link |
| `--color-hover` | `#a88` | Menu item under the pointer |
| `--color-overlay`, `--color-overlay-strong` | black at 70% and 90% | The back-to-top button |
| `--font-body`, `--font-heading` | Fira Sans, Source Serif 4, with fallbacks | Text, menu, captions; headings and header |
| `--text-sm` to `--text-2xl` | 13, 15, 16, 19, 23, 28px, in rem | The type scale; see Typography |
| `--leading`, `--leading-tight` | `1.6`, `1.2` | Line height of text and of headings |
| `--measure` | `70ch` | Longest line of running text |
| `--color-muted`, `--color-rule` | `#666`, `#eee` | Captions and menu titles; light dividers |
| `--color-link`, `--color-link-hover` | `#990000`, `#660000` | Links in the content |
| `--shadow-page` | soft, black at 35% | The shadow under the page |
| `--space-s`, `--space-m`, `--space-l` | `10px`, `20px`, `30px` | Padding and gaps |
| `--page-max-width` | `67.5rem` (1080px) | The widest the page gets, as on the 2026 and 2027 sites |
| `--logo-width`, `--host-logo-width` | `220px`, `220px` | The two header logo slots on desktop |

The framework files hard-code the same colours; `tokens.css` repeats them so
the site's own components match. Changing a token changes the site's
components, not the framework's menu or page background.

### Phone layout

Below `48em` (768px at the default font size). Custom properties can't be
used in media queries, so each file writes `@media screen and (max-width:
48em)` itself; keep that value the same everywhere.

On phones: a strip of red above and below the page, which keeps its rounded
corners; one column with the content first and the menu after it; smaller header and logos, a "Menu" link under the header, and wide
tables scroll sideways instead of widening the page. None of it needs
JavaScript.

### Typography

Two fonts, each with one role: the pairing is meant to say *technology on
solid theory*.

- **Source Serif 4** for headings and for the conference name, dates and
  city in the header, as the 2026 and 2027 sites set them in a serif: a
  scholarly serif with optical sizes the browser picks from the text size.
  Variable, weights 200 to 900. Headings and the conference name are
  semibold (600), the header's dates and city medium (500).
- **Fira Sans** for running text, the menu and captions: a humanist sans
  designed by Erik Spiekermann for Mozilla, engineered for screens. Weights
  400, 600 and 700, and a true 400 italic, covering latin, latin-ext,
  greek, greek-ext, cyrillic, cyrillic-ext and vietnamese.

The site used Open Sans and Droid Serif until November 2026, as the 2026 and
2027 sites did, then briefly IBM Plex (too anonymous) and Space Grotesk for
text (no italic, no Greek or Cyrillic). The
fallbacks while the fonts load are Georgia for headings and the system's own
sans for text.

The scale, in `tokens.css` and applied by `site/typography.css`. The
framework sets 12px text; the site overrides it with 16px, headings on a 1.2 ratio.

| Use | Token | Size |
| - | - | - |
| Captions | `--text-sm` | 13px |
| Menu entries and group titles (Fira Sans) | `--text-ui` | 15px |
| Running text (Fira Sans) | `--text-base` | 16px |
| `h3` (dark grey), the home page's welcome line | `--text-lg` | 19px |
| `h2` (red) | `--text-xl` | 23px, 20px on phones |
| `h1` (red) | `--text-2xl` | 28px, 24px on phones |

Sizes are in `rem`, so they follow the reader's browser font size. Body text
has line height 1.6, headings 1.2. Paragraphs and lists stop at about 70
characters per line (`--measure`), however wide the screen.

Links in the content are red with a thin underline. The menu keeps the 2027
look, bold group titles over a thick grey rule, in Fira Sans.

### Fonts

The fonts are served by the site itself, from `src/fonts/`, and **never from
Google Fonts**. A page that loads fonts from Google sends each visitor's IP
address to Google before they can agree to it. In January 2022 the Munich
Regional Court held that this breaches the GDPR (LG München I, 3 O 17493/20).
The ruling is German, but the GDPR applies across the EU, Denmark included. The 2026 and 2027
sites loaded both fonts from Google; this one does not.

| File | Font | Licence |
| - | - | - |
| `source-serif-4-<alphabet>.woff2` | Source Serif 4, upright, variable 200 to 900, optical sizes | SIL OFL 1.1, `OFL-source-serif-4.txt` |
| `source-serif-4-italic-<alphabet>.woff2` | Source Serif 4, italic, same axes | same |
| `fira-sans-<weight>-<alphabet>.woff2` | Fira Sans, 400, 600 and 700 | SIL OFL 1.1, `OFL-fira-sans.txt` |
| `fira-sans-400-italic-<alphabet>.woff2` | Fira Sans, 400 italic | same |

The browser downloads only the files whose `unicode-range` covers characters
on the page: a typical page loads the latin files of Fira Sans (about 17 KB
per weight) and Source Serif upright (119 KB); the Source Serif italic
(126 KB) only for an italic heading. The licence files are published next
to the fonts, as the licences ask.

The files were downloaded once, in November 2026, from Google Fonts' servers
(Source Serif 4 variable, Fira Sans in four styles), and the licences from
the google/fonts repository.

To add a font or a weight: download its `.woff2` files once, put them and
the licence in `src/fonts/`, and add an `@font-face` rule to `fonts.css`
with `font-display: swap`. Never link a stylesheet or font from
`fonts.googleapis.com`, `fonts.gstatic.com`, or any other host.

## Components

Each component: where its markup is, where it is styled, and what may be
changed.

### Page frame

- Markup: `src/_includes/base.njk`. `#col1` holds the menu, `#col3` the
  content. The IDs come from the framework; don't rename them.
- Styles: `yaml/basemod.css` for desktop, `site/frame.css` for phones.

### Header

- Markup: `src/_includes/partials/header.njk`.
- Styles: `site/header.css`.
- Data: name, dates, city, logos from `src/_data/site.yaml`.
- The conference logo on the left and the host university's on the right
  have slots of the same width (`--logo-width`, `--host-logo-width`, both
  220px), so the title is centred. The host logo fills 80% of its slot
  (`--host-logo-scale`), against the right edge. The host slot is kept, empty, until
  `host_logo` is set; on phones, where the header stacks, an empty slot is
  hidden.

### Menu

- Markup: `src/_includes/partials/menu.njk`, rendered from
  `src/_data/menu.yaml`.
- Styles: `yaml/nav_vlist.css`, the framework's vertical list: group titles
  are `h6.vlist`, the current page is `li.active`. `site/menu.css` sets the
  fonts and sizes only.
- Groups, in the 2027 order: General Information, Program, Co-located
  Events, Diversity, Equity and Inclusion (DEI), Calls, Organization,
  Sponsorship; then Follow Us, for LinkedIn, which 2027 listed under
  Sponsorship.

### Content

- Markup: each page in `src/pages/`.
- Styles: `yaml/content.css` for the basics, `site/typography.css` for text
  size, headings and links, `site/content.css` for images, tables and the CMT
  acknowledgement.

### Cover photo

- Markup: `src/_includes/partials/cover.njk`, included at the top of
  `src/pages/index.md`.
- Styles: `site/cover.css`.
- Data: `cover` in `src/_data/site.yaml`: the image in two widths (1600px,
  and 800px for phones, picked by the browser through `srcset`), its size,
  alt text, and the credit shown under it and in `humans.txt`.

### Home page

- Markup: `src/pages/index.md`, in the 2027 order: the welcome line, the
  cover photo, EDBT and ICDT, "We thank our Sponsors", "News" with the five
  latest items and a link to all.
- Styles: `site/home.css`.
- Data: `src/_data/sponsors.yaml` (logos by tier; with none yet, a line
  points to the sponsorship page) and `src/_data/news.yaml`, through
  `partials/sponsors.njk` and `partials/news.njk`.

### Back to top

- Markup: the last link in `base.njk`, to `#top` on `<body>`.
- Styles: `site/back-to-top.css`. Hidden when printing.
