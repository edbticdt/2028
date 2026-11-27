#!/bin/sh
# Stage the site for GitHub Pages: copy the tracked files into _site/, leaving
# out what .pagesignore lists, then fail if a doc asset from the README's asset
# table would be published anyway.
#
# Tracked files only, so a local run stages what CI publishes, never an ignored
# CLAUDE.md or .temp/. Two copies, because rsync does not apply
# --exclude-from to a --files-from list.
set -eu

[ -f .pagesignore ] || { echo "pages-stage: no .pagesignore" >&2; exit 1; }
[ -f README.md ] || { echo "pages-stage: no README.md, so no asset table to check" >&2; exit 1; }
git rev-parse --is-inside-work-tree >/dev/null 2>&1 ||
  { echo "pages-stage: not a git repository, so no list of tracked files" >&2; exit 1; }
[ -z "$(git ls-files -d)" ] ||
  { echo "pages-stage: tracked files are deleted from the working tree; commit or restore them" >&2; exit 1; }

tracked=$(mktemp -d)
trap 'rm -rf "$tracked"' EXIT
git ls-files -z | rsync -a --from0 --files-from=- ./ "$tracked"/
rm -rf _site
mkdir _site
rsync -a --exclude-from=.pagesignore "$tracked"/ _site/

status=0
for path in $(awk -F'|' '$3 ~ /^ *doc *$/ { gsub(/[ `]/, "", $2); print $2 }' README.md); do
  if [ -e "_site/$path" ]; then
    echo "pages-stage: $path is a doc asset in README.md but would be published;" \
      "add it to .pagesignore" >&2
    status=1
  fi
done
exit "$status"
