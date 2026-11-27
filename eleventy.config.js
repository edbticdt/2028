import { load } from "js-yaml";

export default function (eleventyConfig) {
  // Data files in src/_data/ may be YAML as well as JSON.
  eleventyConfig.addDataExtension("yaml,yml", (contents) => load(contents));

  // Copied to the site as they are.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/resources");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
