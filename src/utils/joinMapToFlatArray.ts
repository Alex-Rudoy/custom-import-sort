import { TConfigWithId, TImportData } from '../types';

export const joinMapToFlatArray = (
  linesMap: Record<string, TImportData[]>,
  configArray: TConfigWithId[],
): string[] => {
  const sortedImportLines: string[] = [];

  configArray.forEach((config) => {
    let tempGroup: string[] = [];
    if (linesMap[config.id]) {
      linesMap[config.id]
        .slice()
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((importLine) => {
          tempGroup.push(importLine.line);
        });
    }
    if (config.groupLabel && tempGroup.length > 0) {
      const groupLabelString = `// ${config.groupLabel}`;
      if (!tempGroup[0].includes(groupLabelString)) {
        tempGroup.unshift(groupLabelString);
      }
    }
    if (
      config.lineafter &&
      tempGroup.length > 0
    ) {
      tempGroup.push('');
    }

    // Flatten tempGroup into sortedImportLines
    sortedImportLines.push(...tempGroup);
  });

  sortedImportLines.push('');

  return sortedImportLines;
};
