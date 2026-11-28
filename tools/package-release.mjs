// Packs the built site as plain, readable HTML, for anyone who wants to edit
// the site by hand instead of with Eleventy.
//
//   npm run package              version from `git describe`, such as v1.0.0
//   npm run package -- v1.2.0    an explicit version
//
// It deletes _site/ and builds afresh, so nothing left over from an earlier
// build is packed, then writes dist/edbticdt-2028-site-<version>/ and the
// .zip of it. It formats the HTML pages with Prettier; stylesheets, fonts and
// images are copied unchanged (the YAML framework stylesheets must stay as
// they are).

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as prettier from "prettier";

const root = path.resolve(import.meta.dirname, "..");
const site = path.join(root, "_site");
const dist = path.join(root, "dist");

const version =
  process.argv[2] ||
  execFileSync("git", ["describe", "--tags", "--always", "--dirty"], { cwd: root, encoding: "utf8" }).trim();
if (!/^[\w.-]+$/.test(version)) throw new Error(`Unusable version "${version}"`);
// A clean build: Eleventy never deletes files from _site/ on its own.
rmSync(site, { recursive: true, force: true });
execFileSync(path.join(root, "node_modules", ".bin", "eleventy"), { cwd: root, stdio: "inherit" });
if (!existsSync(path.join(site, "index.html"))) throw new Error("The build wrote no _site/index.html.");

const name = `edbticdt-2028-site-${version}`;
const out = path.join(dist, name);
rmSync(out, { recursive: true, force: true });
rmSync(`${out}.zip`, { force: true });
mkdirSync(dist, { recursive: true });
cpSync(site, out, { recursive: true });

// Format every page, and collect its title for the README's page list.
const pages = [];
for (const file of readdirSync(out).filter((f) => f.endsWith(".html")).sort()) {
  const full = path.join(out, file);
  const html = readFileSync(full, "utf8");
  const formatted = await prettier.format(html, {
    parser: "html",
    printWidth: 100,
    htmlWhitespaceSensitivity: "css",
  });
  writeFileSync(full, formatted);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, file])[1].split(" - ")[0];
  pages.push(`| \`${file}\` | ${title} |`);
}

const template = readFileSync(path.join(import.meta.dirname, "release-readme.md"), "utf8");
writeFileSync(
  path.join(out, "README.md"),
  template
    .replaceAll("{{version}}", version)
    .replaceAll("{{date}}", new Date().toISOString().slice(0, 10))
    .replace("{{pages}}", pages.join("\n")),
);

execFileSync("zip", ["-rqX", `${name}.zip`, name], { cwd: dist });
console.log(`Packed ${pages.length} pages: dist/${name}.zip`);
