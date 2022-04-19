
export type TConfig = {
  regex: string;
  importance: number;
  lineafter: boolean;
};

export type TConfigWithId = TConfig & {
  id: number;
};

export type TImportData = { line: string; path: string };
