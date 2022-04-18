import { TConfig } from "./types";

export const defaultConfigArray: TConfig[] = [
  {
    name: "rest",
    regex: ".",
    importance: 0,
    lineafter: true,
  },
  {
    name: "sameFolder",
    regex: "^\\.\\/",
    importance: 1,
    lineafter: false,
  },
  {
    name: "aliases",
    regex: "^@",
    importance: 2,
    lineafter: true,
  },
  {
    name: "types",
    regex: "\\.types\\.tsx?$",
    importance: 9,
    lineafter: true,
  },
  {
    name: "styles",
    regex: "\\.module\\.s?css$",
    importance: 10,
    lineafter: true,
  },
];
