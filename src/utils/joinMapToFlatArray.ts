
import { TConfigWithId, TImportData } from "../types";

export const joinMapToFlatArray = (
  linesMap: Record<string, TImportData[]>,
  configArray: TConfigWithId[]
): string[] => {
  const sortedImportLines: string[] = [];

  configArray.forEach((config) => {
    if (linesMap[config.id]) {
      linesMap[config.id]
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((importLine) => {
          sortedImportLines.push(importLine.line);
        });
    }
    if (config.lineafter && sortedImportLines.length > 0) {
      sortedImportLines.push("");
    }
  });

  return sortedImportLines;
};
