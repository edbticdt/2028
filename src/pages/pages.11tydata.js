import path from "node:path";

// Settings for every page in src/pages/. A page's key is its file name
// without ".md": index.md is "index", venue.md is "venue". The key gives the
// page its URL (venue.html), and menu.yaml lists pages by key.
export default {
  layout: "base.njk",
  eleventyComputed: {
    key: (data) => path.basename(data.page.inputPath, ".md"),
  },
  permalink: (data) => `${path.basename(data.page.inputPath, ".md")}.html`,
};
