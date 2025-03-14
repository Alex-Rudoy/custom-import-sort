import { getAndValidateConfig } from './getAndValidateConfig';
import { groupLines } from './groupLines';
import { joinMapToFlatArray } from './joinMapToFlatArray';
import { splitImportsAndNonImports } from './splitImportsAndNonImports';

export const sortImports = (text: string) => {
  const configArray = getAndValidateConfig();
  const lines = text.split('\n');
  const { importLines, nonImportLines } = splitImportsAndNonImports(lines);
  const linesMap = groupLines(importLines, configArray);
  const sortedImportLines = joinMapToFlatArray(linesMap, configArray);
  return [...sortedImportLines, ...nonImportLines]
    .filter((line, index, array) => !(!line && !array[index + 1])) // remove multiple empty lines in a row
    .join('\n');
};
