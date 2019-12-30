import { appendFile } from "fs-extra";
import { resolve } from "path";
import { STYLING_CSS_FILENAME } from "../constants";

export default function writeCSS(css: string, outputPath: string = __dirname) {
  appendFile(resolve(outputPath, STYLING_CSS_FILENAME), { encoding: "utf-8" });
}