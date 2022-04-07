// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { customAlphabet } = require("nanoid");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "nanoid" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposables = [];
  disposables.push(
    vscode.commands.registerCommand("nanoid-generator.generate", function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      let config = vscode.workspace.getConfiguration("nanoid");
      let nanoIdLength = config.get("length", 10);
      let nanoIdAlphabet = config.get("alphabet", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");
      const nanoid = customAlphabet(nanoIdAlphabet, nanoIdLength);
      vscode.env.clipboard.writeText(nanoid());
      vscode.commands.executeCommand("editor.action.clipboardPasteAction");
    })
  );

  disposables.push(
    vscode.commands.registerCommand("nanoid-generator.clipboard", function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      let config = vscode.workspace.getConfiguration("nanoid-generator");
      let nanoIdLength = config.get("length", 10);
      let nanoIdAlphabet = config.get("alphabet", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");
      const nanoid = customAlphabet(nanoIdAlphabet, nanoIdLength);
      vscode.env.clipboard.writeText(nanoid());
      vscode.window.showInformationMessage("'nanoid' copied to clipboard");
    })
  );

  context.subscriptions.concat(disposables);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
