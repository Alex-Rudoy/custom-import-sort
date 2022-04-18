import * as vscode from "vscode";
import { defaultConfigArray } from "./defaultConfigArray";
import { TConfig, TImportData } from "./types";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "custom-import-sort" is now active!');

  let organize = vscode.commands.registerCommand("custom-import-sort.sort-imports", () => {
    // organize imports in js or ts file alphabetically
    // based on the current file's extension
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const fileName = document.fileName;
      const ext = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (/^[jt]sx?$/.test(ext)) {
        const text = document.getText();
        const sortedText = sortImports(text);
        editor.edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(new vscode.Position(0, 0), new vscode.Position(document.lineCount, 0)),
            sortedText
          );
        });
      }
    }
  });

  const sortImports = (text: string) => {
    // get config from settings.json
    const configArray: TConfig[] = vscode.workspace.getConfiguration("custom-import-sort").has("sorting")
      ? (vscode.workspace.getConfiguration("custom-import-sort").get("sorting") as TConfig[])
      : defaultConfigArray;
    const importanceOrder = configArray
      .slice()
      .sort((a, b) => b.importance - a.importance)
      .map((config) => ({ ...config, regex: new RegExp(config.regex, "i") }));
    console.log(importanceOrder);

    const lines = text.split("\n");
    const importLines: TImportData[] = [];
    const nonImportLines: string[] = [];
    lines.forEach((line) => {
      if (line.startsWith("import")) {
        importLines.push({ line, path: line.split('"')[1] });
      } else {
        nonImportLines.push(line);
      }
    });

    const lineMap = configArray.reduce((obj: Record<string, TImportData[]>, config) => {
      obj[config.name] = [];
      return obj;
    }, {});

    importLines.forEach((importLine) => {
      for (let i = 0; i < importanceOrder.length; i++) {
        if (importanceOrder[i].regex.test(importLine.path)) {
          lineMap[importanceOrder[i].name].push(importLine);
          return;
        }
      }
    });
    console.log(lineMap);

    const sortedInportLines: string[] = [];

    configArray.forEach((config) => {
      lineMap[config.name]
        .sort((a, b) => ("" + a.path).localeCompare(b.path))
        .forEach((importLine) => {
          sortedInportLines.push(importLine.line);
        });
      if (config.lineafter) {
        sortedInportLines.push("");
      }
    });

    return [...sortedInportLines, ...nonImportLines].join("\n");
  };
}

// this method is called when your extension is deactivated
export function deactivate() {}
