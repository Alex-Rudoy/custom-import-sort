export type TConfig = {
  regex: string;
  importance: number;
  lineafter: boolean; // TODO: Matt rename lineAfter
  groupLabel: string;
};

export type TConfigWithId = TConfig & {
  id: number;
};

export type TImportData = { line: string; path: string };
