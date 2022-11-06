import { TImportData } from "../types";

export const splitImportsAndNonImports = (
  lines: string[]
): { importLines: TImportData[]; nonImportLines: string[] } => {
  const importLines: TImportData[] = [];
  const nonImportLines: string[] = [];
  let commentLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("//")) {
      commentLines.push(lines[i] + "\n");
      continue;
    }

    if (lines[i].startsWith("/*")) {
      while (!lines[i].endsWith("*/")) {
        commentLines.push(lines[i] + "\n");
        i++;
      }
      commentLines.push(lines[i] + "\n");
      continue;
    }

    if (lines[i].startsWith("import")) {
      let path = lines[i].split(/["']/)[1];
      importLines.push({
        line: `${commentLines.join("")}${lines[i]}`,
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
    } else {
      nonImportLines.push(lines[i]);
    }
  }
  return {
    importLines,
    nonImportLines: [
      ...commentLines.map((line) => line.replace(/\n$/, "")),
      ...nonImportLines,
    ],
  };
};
