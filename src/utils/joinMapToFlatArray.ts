import { TConfigWithId, TImportData } from '../types';

export const joinMapToFlatArray = (
  linesMap: Record<string, TImportData[]>,
  configArray: TConfigWithId[],
): string[] => {
  const sortedImportLines: string[] = [];

  configArray.forEach((config) => {
    const tempLines = [];
    if (linesMap[config.id]) {
      linesMap[config.id]
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((importLine) => {
          tempLines.push(importLine.line);
        });
    }
    if (config.lineafter && tempLines.length > 0) {
      tempLines.push('');
    }
    sortedImportLines.push(...tempLines);
  });
  sortedImportLines.push('');

  return sortedImportLines;
};
