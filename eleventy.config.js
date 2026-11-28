import { load } from "js-yaml";

export default function (eleventyConfig) {
  // Data files in src/_data/ may be YAML as well as JSON.
  eleventyConfig.addDataExtension("yaml,yml", (contents) => load(contents));

  // Copied to the site as they are. Only the stylesheets from src/css/, and
  // only the font files and their licences from src/fonts/.
  eleventyConfig.addPassthroughCopy("src/css/**/*.css");
  eleventyConfig.addPassthroughCopy("src/fonts/*.{woff2,txt}");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/resources");

  // The build date as YYYY/MM/DD, the form humans.txt uses.
  eleventyConfig.addFilter("buildDate", () =>
    new Date().toISOString().slice(0, 10).replaceAll("-", "/"),
  );

  // 31 -> "31st", for edition numbers.
  eleventyConfig.addFilter("ordinal", (n) => {
    const tens = n % 100;
    const suffix =
      tens >= 11 && tens <= 13
        ? "th"
        : { 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th";
    return `${n}${suffix}`;
  });

  // ["A", "B", "C"] -> "A, B and C".
  eleventyConfig.addFilter("listJoin", (items) =>
    items.length < 2
      ? items.join("")
      : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`,
  );

  // Escape a short text, then turn Markdown links, [text](url), into HTML
  // links. For one-line texts in data files, such as news items.
  eleventyConfig.addFilter("inlineLinks", (text) => {
    const escaped = String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    return escaped.replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_, label, url) => `<a href="${url}">${label}</a>`,
    );
  });

  // Notes for maintainers next to the assets, never pages of the site.
  eleventyConfig.ignores.add("src/css/**/*.md");
  eleventyConfig.ignores.add("src/fonts/**/*.md");

  // Every page of the site, one Markdown file each in src/pages/.
  eleventyConfig.addCollection("pages", (api) =>
    api.getFilteredByGlob("src/pages/*.md"),
  );

  // Look up a page by its key, the file name without ".md". A key with no page
  // stops the build, so the menu can never link to a page that doesn't exist.
  eleventyConfig.addFilter("pageByKey", (pages, key) => {
    const found = pages.find((p) => p.data.key === key);
    if (!found) {
      throw new Error(
        `No page "${key}": src/pages/${key}.md doesn't exist. ` +
          `Check src/_data/menu.yaml.`,
      );
    }
    return found;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
