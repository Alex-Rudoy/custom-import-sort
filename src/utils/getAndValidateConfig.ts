import * as vscode from "vscode";

import { TConfig, TConfigWithId } from "../types";

export const getAndValidateConfig = (): TConfigWithId[] => {
  const baseConfig = vscode.workspace
    .getConfiguration("customImportSort")
    .get("sortingSettings") as TConfig[];

  if (!(baseConfig instanceof Array)) {
    throw new Error("Invalid config: config must be an array");
  }

  baseConfig.forEach((item, index) => {
    if (!item.regex) {
      throw new Error(`Invalid config: Missing regex in item #${index}`);
    }

    if (!item.importance) {
      throw new Error(`Invalid config: Missing importance in item #${index}`);
    }

    if (typeof item.regex !== "string") {
      throw new Error(
        `Invalid config: Regex must be a string in item #${index}`
      );
    }

    if (typeof item.importance !== "number") {
      throw new Error(
        `Invalid config: Importance must be a number in item #${index}`
      );
    }

    try {
      new RegExp(item.regex);
    } catch (error) {
      throw new Error(
        `Invalid config: Invalid regex ${item.regex} in item #${index}`
      );
    }
  });
  return baseConfig.map((config, id) => ({ ...config, id }));
};
