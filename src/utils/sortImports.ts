import { TConfig, TImportData } from "../types";
import * as vscode from "vscode";

export const sortImports = (text: string) => {
  // get config from settings.json if possible
  const configArray = vscode.workspace.getConfiguration("customImportSort").get("sortingSettings") as TConfig[];

  const importanceOrder = configArray.slice().sort((a, b) => b.importance - a.importance);

  const lines = text.split("\n");
  const importLines: TImportData[] = [];
  const nonImportLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("import")) {
      let path = lines[i].split(/["']/)[1];
      importLines.push({ line: lines[i], path });
      while (!path) {
        i++;
        path = lines[i].split(/["']/)[1];
        importLines[importLines.length - 1].line += `\n${lines[i]}`;
        importLines[importLines.length - 1].path = path;
      }
    } else {
      nonImportLines.push(lines[i]);
    }
  }
  lines.forEach((line, i) => {});

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
