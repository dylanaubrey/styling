import { removeSync, writeFileSync } from "fs-extra";
import { parse } from "path";
import { StylingNamedExports } from "../types";
import { error } from "./log";

export default function evalStylingFile(code: string, filename: string) {
  const { dir, ext, name } = parse(filename);
  const tempFilePath = `${dir}/__${name}.temp${ext}`;
  writeFileSync(tempFilePath, code, { encoding: "utf-8" });

  require("@babel/register")({
    plugins: ["@babel/plugin-transform-modules-commonjs"],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: "commonjs",
          targets: { node: "current" },
        },
      ],
    ],
  });

  let output: StylingNamedExports | undefined;

  try {
    output = require(tempFilePath);
    removeSync(tempFilePath);
  } catch (e) {
    error("Error evaluating styling file", e);
    removeSync(tempFilePath);
  }

  return output;
}
