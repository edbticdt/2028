// The package versions, read from package.json, for humans.txt.
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)));

export default { devDependencies: pkg.devDependencies };
