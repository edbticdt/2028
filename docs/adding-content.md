# Adding content

How to change what the site shows, without changing its design: pages, the
menu, links, images, PDFs, the dates. How to send the change (on github.com
or locally) is in [CONTRIBUTING.md](../CONTRIBUTING.md). What each component
looks like is in [design.md](design.md); how the copy should read, in
[voice.md](voice.md).

## The edition settings

`src/_data/site.yaml` holds what changes every year and shows up on many
pages: the year, the conference name, the city and country, the dates, the
logos, the cover photo, and the team and copyright holder for `humans.txt`.

To change the dates, edit the `dates` line. It is plain text, shown in the
header and on the home page as written:

```yaml
dates: 21st March - 24th March, 2028
```

## Pages

Every page is one Markdown file in `src/pages/`, published under the same
name: `src/pages/venue.md` becomes `venue.html`.

The pages today:

| File | Menu | State |
| - | - | - |
| `index.md` | Home | Cover photo, welcome, EDBT and ICDT history |
| `venue.md` | Venue | Placeholder |
| `travel.md` | Travel | Placeholder |
| `accommodation.md` | Accommodation | Placeholder |
| `important-dates.md` | Important Dates | Placeholder |
| `edbt-call-for-papers.md` | EDBT Call for Papers | Placeholder |
| `icdt-call-for-papers.md` | ICDT Call for Papers | Placeholder |
| `organisers.md` | Conference Officers | Placeholder |

A placeholder page has its title and one line saying the content will be
announced. To fill one in, replace that line.

### Adding a page

Create `src/pages/<name>.md`, the name in lowercase with hyphens:

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
  show. Without it, the one in `site.yaml` is used.

The header and the menu come from the layout; a page never repeats them.
Then add the page to the menu, below.

### Values from the settings

A page can show a value from `site.yaml` by writing its name in double
braces, so it never goes out of date:

```markdown
The conference takes place in {{ site.city }}, {{ site.country }}.
```

## The menu

`src/_data/menu.yaml` lists the menu in groups. Each entry is a page's file
name without `.md`:

```yaml
- group: General Information
  items:
    - index
    - venue
```

The menu shows the page's `menu_label`, or its `title` if it has none. An
entry can also carry its own label, or link to another site:

```yaml
    - { page: venue, label: Conference Venue }
    - { label: LinkedIn, url: "https://www.linkedin.com/company/edbt-icdt-conference/" }
```

An entry whose page doesn't exist stops the build, and the error names it:
the menu can never link to a missing page.

## Links

The site is served at <https://edbticdt.github.io/2028/>, under the `/2028/`
path; <https://edbticdt.github.io/> is a different site. Every page sits at
the same level, so link to this site's pages, images and PDFs by their plain
name:

```markdown
[Venue](venue.html)
[Call for papers](resources/call-for-papers.pdf)
```

Never start a link with `/`: `/venue.html` would point to the organisation's
site, not this one. Links to other sites are written in full:
`[Aarhus](https://visitaarhus.com)`.

## Images

Images live in `src/images/`, in a folder per kind: `logos/`, `cover/`, and
a new folder for anything else, such as `venue/`.

Before adding one:

- **Size**: at most 1600 pixels wide, and under 500 KB. A photo straight
  from a camera or phone is several MB and slows the page down: resize it
  first.
- **Format**: JPEG for photos, PNG for screenshots and diagrams, SVG for
  logos.
- **Name**: lowercase with hyphens, saying what it shows:
  `venue-main-hall.jpg`.
- **Rights**: use only images the conference may publish, and note who made
  each one.

To show it on a page:

```markdown
![The main hall of the venue](images/venue/venue-main-hall.jpg)
```

The text in square brackets is the alt text: what the image shows, for
readers who can't see it. Always write it. Images shrink to fit the column,
on phones too.

For a photo credit under the image:

```html
<figure>
  <img src="images/venue/venue-main-hall.jpg" alt="The main hall of the venue">
  <figcaption>Photo by Jane Doe</figcaption>
</figure>
```

### The cover photo

The photo at the top of the home page is set under `cover` in
`site.yaml`: two widths of the same photo, its size in pixels, the alt text,
and the credit, shown under the photo and in `humans.txt`. To replace it:

1. Prepare the photo at 1600 pixels wide, and a copy at 800 pixels wide for
   phones.
2. Upload both to `src/images/cover/`.
3. In `site.yaml`, change `image`, `image_small`, `width`, `height` (of the
   1600-pixel one), `alt`, and the credit fields.

### The logos

`logo` in `site.yaml` is the conference logo, on the left of the header;
`host_logo` the host institution's, on the right; `favicon` the small icon
in the browser tab. Each is a path under `src/images/`, and appears only
when filled in. Use SVG where there is one. Keep the original files, such as
a PDF, in `archive/logo/`, which is never published.

## PDFs and other files

Put them in `src/resources/` (create the folder the first time), and link to
them as `resources/<name>.pdf`.

## Past venues

`src/_data/history.yaml` lists where EDBT and ICDT were held. The home page
shows the lists, and counts them for the edition numbers ("31st"). Each
year, add the previous edition's city at the end of `joint`.
