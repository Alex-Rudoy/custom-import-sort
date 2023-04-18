import { TConfigWithId, TImportData } from '../types';

export const joinMapToFlatArray = (
  linesMap: Record<string, TImportData[]>,
  configArray: TConfigWithId[],
): string[] => {
  const sortedImportLines: string[] = [];

  configArray.forEach((config) => {
    if (linesMap[config.id]) {
      linesMap[config.id]
        .slice()
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((importLine) => {
          sortedImportLines.push(importLine.line);
        });
    }
    if (
      config.lineafter &&
      sortedImportLines.length &&
      sortedImportLines[sortedImportLines.length - 1] !== ''
    ) {
      sortedImportLines.push('');
    }
  });
  sortedImportLines.push('');

  return sortedImportLines;
};
