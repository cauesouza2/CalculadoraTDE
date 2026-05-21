import { copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("dist");
const staticFiles = ["index.html", "style.css", "script.js", "calculator.js"];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await Promise.all(
    staticFiles.map(file => copyFile(resolve(file), resolve(outputDir, file))),
);
