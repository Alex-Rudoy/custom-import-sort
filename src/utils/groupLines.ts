import { TConfigWithId, TImportData } from '../types';

export const groupLines = (
  importLines: TImportData[],
  configArray: TConfigWithId[],
): Record<string, TImportData[]> => {
  const linesMap: Record<string, TImportData[]> = {};

  const importanceOrder = configArray
    .slice()
    .sort((a, b) => b.importance - a.importance);

  importLines.forEach((importLine) => {
    for (const element of importanceOrder) {
      if (RegExp(element.regex, 'i').test(importLine.path)) {
        if (!linesMap[element.id]) {
          linesMap[element.id] = [];
        }
        linesMap[element.id].push(importLine);
        return;
      }
    }
  });
  return linesMap;
};
