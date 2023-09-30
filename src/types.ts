export type TConfig = {
  regex: string;
  importance: number;
  lineAfter: boolean;
  groupLabel: string;
};

export type TConfigWithId = TConfig & {
  id: number;
};

export type TImportData = { line: string; path: string };
