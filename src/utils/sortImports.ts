import * as vscode from "vscode";
import { TConfig, TImportData } from "../types";

export const sortImports = (text: string) => {
  // get config from settings.json if possible
  const configArray = vscode.workspace.getConfiguration("customImportSort").get("sortingSettings") as TConfig[];

  const importanceOrder = configArray.slice().sort((a, b) => b.importance - a.importance);

  const lines = text.split("\n");
  const importLines: TImportData[] = [];
  const nonImportLines: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith("import")) {
      importLines.push({ line, path: line.split(/["']/)[1] });
    } else {
      nonImportLines.push(line);
    }
  });

  const linesMap = configArray.reduce((obj: Record<string, TImportData[]>, config) => {
    obj[config.name] = [];
    return obj;
  }, {});

  importLines.forEach((importLine) => {
    for (let i = 0; i < importanceOrder.length; i++) {
      if (RegExp(importanceOrder[i].regex, "i").test(importLine.path)) {
        linesMap[importanceOrder[i].name].push(importLine);
        return;
      }
    }
  });

  const sortedInportLines: string[] = [];

  configArray.forEach((config) => {
    linesMap[config.name]
      .sort((a, b) => ("" + a.path).localeCompare(b.path))
      .forEach((importLine) => {
        sortedInportLines.push(importLine.line);
      });
    if (config.lineafter) {
      sortedInportLines.push("");
    }
  });

  return [...sortedInportLines, ...nonImportLines]
    .filter((line, index, array) => line !== "" || line !== array[index + 1])
    .join("\n");
};
