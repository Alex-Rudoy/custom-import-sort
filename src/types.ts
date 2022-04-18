export type TConfig = {
  name: string;
  regex: string;
  importance: number;
  lineafter: boolean;
};

export type TImportData = { line: string; path: string };
