
import { TConfigWithId, TImportData } from "../types";

export const groupLines = (
  importLines: TImportData[],
  configArray: TConfigWithId[]
): Record<string, TImportData[]> => {
  const linesMap: Record<string, TImportData[]> = {};

  const importanceOrder = configArray
    .slice()
    .sort((a, b) => b.importance - a.importance);

  importLines.forEach((importLine) => {
    for (let i = 0; i < importanceOrder.length; i++) {
      if (RegExp(importanceOrder[i].regex, "i").test(importLine.path)) {
        if (!linesMap[importanceOrder[i].id]) {
          linesMap[importanceOrder[i].id] = [];
        }
        linesMap[importanceOrder[i].id].push(importLine);
        return;
      }
    }
  });
  return linesMap;
};
