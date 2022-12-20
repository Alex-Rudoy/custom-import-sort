import * as vscode from "vscode";

import { sortImports } from "./utils/sortImports";
import { sortImportsPreservingComments } from "./utils/sortImportsPreservingComments";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("customImportSort.sortImports", () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const fileName = document.fileName;
        const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (/^[jt]sx?$/.test(extension)) {
          const text = document.getText();
          const sortedText = sortImports(text);
          if (text !== sortedText) {
            editor.edit((editBuilder) => {
              editBuilder.replace(
                new vscode.Range(
                  new vscode.Position(0, 0),
                  new vscode.Position(document.lineCount, 0)
                ),
                sortedText
              );
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(error.message);
      }
    }
  });

  vscode.commands.registerCommand(
    "customImportSort.sortImportsPreservingComments",
    () => {
      try {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const document = editor.document;
          const fileName = document.fileName;
          const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
          if (/^[jt]sx?$/.test(extension)) {
            const text = document.getText();
            const sortedText = sortImportsPreservingComments(text);
            if (text !== sortedText) {
              editor.edit((editBuilder) => {
                editBuilder.replace(
                  new vscode.Range(
                    new vscode.Position(0, 0),
                    new vscode.Position(document.lineCount, 0)
                  ),
                  sortedText
                );
              });
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(error.message);
        }
      }
    }
  );

  // run customImportSort.sortImports on save if enabled
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(() => {
      const config = vscode.workspace.getConfiguration("customImportSort");

      if (config.get("sortOnSave")) {
        vscode.commands.executeCommand("customImportSort.sortImports");
      }

      if (config.sortOnSavePreservingComments) {
        vscode.commands.executeCommand(
          "customImportSort.sortImportsPreservingComments"
        );
      }
    })
  );
}

export function deactivate() {}
