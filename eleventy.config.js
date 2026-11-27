import { load } from "js-yaml";

export default function (eleventyConfig) {
  // Data files in src/_data/ may be YAML as well as JSON.
  eleventyConfig.addDataExtension("yaml,yml", (contents) => load(contents));

  // Copied to the site as they are.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/resources");

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
