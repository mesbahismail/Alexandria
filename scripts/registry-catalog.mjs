import { readFile, writeFile, mkdir } from "node:fs/promises";
const registry = JSON.parse(await readFile("registry.json", "utf8"));
await mkdir("public/r", { recursive: true });
// The discoverable catalog contains metadata; item endpoints contain installable source.
await writeFile("public/r/registry.json", JSON.stringify(registry, null, 2) + "\n");
await writeFile("public/registry.json", JSON.stringify(registry, null, 2) + "\n");
