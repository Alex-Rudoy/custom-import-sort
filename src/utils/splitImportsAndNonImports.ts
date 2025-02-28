import { excludeKeywords, TImportData } from '../types';

export const splitImportsAndNonImports = (
  lines: string[],
): { importLines: TImportData[]; nonImportLines: string[] } => {
  const importLines: TImportData[] = [];
  const nonImportLines: string[] = [];
  let commentLines: string[] = [];
  let stopMovingComments = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('//') && !stopMovingComments) {
      commentLines.push(lines[i]);
      continue;
    }

    if (lines[i].startsWith('/*') && !stopMovingComments) {
      while (!lines[i].trim().endsWith('*/') && i < lines.length) {
        commentLines.push(lines[i]);
        i++;
      }
      commentLines.push(lines[i]);
      continue;
    }

    if (
      lines[i].startsWith('import') ||
      excludeKeywords.some((keyword) => lines[i].includes(keyword))
    ) {
      let path = lines[i].split(/["']/)[1];
      importLines.push({
        line: `${commentLines.join('\n')}${commentLines.length ? '\n' : ''}${
          lines[i]
        }`,
        path,
      });
      commentLines = [];

      // handle multi-line imports
      while (!path) {
        i++;
        path = lines[i].split(/["']/)[1];
        importLines[importLines.length - 1].line += `\n${lines[i]}`;
        importLines[importLines.length - 1].path = path;
      }
    } else if (stopMovingComments && lines[i].trim() === '') {
      nonImportLines.push(lines[i]);
    } else if (lines[i].trim() !== '') {
      nonImportLines.push(lines[i]);
      stopMovingComments = true;
    }
  }

  return {
    importLines,
    nonImportLines: [...commentLines, ...nonImportLines],
  };
};
