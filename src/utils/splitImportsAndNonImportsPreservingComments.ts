import { TImportData } from "../types";

export const splitImportsAndNonImportsPreservingComments = (
  lines: string[]
): { importLines: TImportData[]; nonImportLines: string[] } => {
  const importLines: TImportData[] = [];
  const nonImportLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("import")) {
      let path = lines[i].split(/["']/)[1];
      importLines.push({
        line: `${lines[i]}`,
        path,
      });

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
    nonImportLines: [...nonImportLines],
  };
};
