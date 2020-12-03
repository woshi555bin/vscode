// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const insertText = (val:string) =>{
	const editor:any = vscode.window.activeTextEditor;
	const selection = editor.selection;
	// 获取光标当前行
	const lineOfSelectedVar = selection.active.line;
	editor.edit((editBuilder:any) => {
		editBuilder.insert(new vscode.Position(lineOfSelectedVar + 1, 0),val);
	});
	
};

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let insertLog = vscode.commands.registerCommand('firstExt.insertLog', () => {
		const editor= vscode.window.activeTextEditor;
		// 拿到光标选中的文本并格式化
		const selection = editor!.selection;
		let text = editor!.document.getText(selection);
		text.replace(/(^\s*)|(\s*$)/g,'');
		const logToInsert = `console.log('${text}:',${text});\n`;
		text ? insertText(logToInsert) : insertText('console.log();');
	});

	context.subscriptions.push(insertLog);

	const deleteAllLog = vscode.commands.registerCommand('firstExt.delLog', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		let workspaceEdit = new vscode.WorkspaceEdit();
		const document = editor.document;

		const logStatements = getAllLogStatements();

		// 循环遍历每个匹配项的range，并删除
		logStatements.forEach((log) => {
			workspaceEdit.delete(document.uri, log);
		});
		// 完成后显示消息提醒
		vscode.workspace.applyEdit(workspaceEdit).then(() => {
			vscode.window.showInformationMessage(`${logStatements.length} console.log deleted`);
		});
	});
	context.subscriptions.push(deleteAllLog);

	let removeComments = vscode.commands.registerCommand('firstExt.removeComments', function () {
		const editor = vscode.window.activeTextEditor;
		editor!.edit(editBuilder => {
			let text = editor!.document.getText();
			// 正则匹配替换掉注释文本
			text = text.replace(/((\/\*([\w\W]+?)\*\/)|(\/\/(.(?!"\)))+)|(^\s*(?=\r?$)\n))/gm, '').replace(/(^\s*(?=\r?$)\n)/gm, '').replace(/\\n\\n\?/gm, '');
			// 全量替换当前页面文本
			const end = new vscode.Position(editor!.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
			// 执行格式化代码操作
			vscode.commands.executeCommand('editor.action.formatDocument');
		});
	});

	context.subscriptions.push(removeComments);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getAllLogStatements(){
	const editor = vscode.window.activeTextEditor;
	// 获取编辑器页面文本
	const document = editor?.document;
	const documentText = document!.getText();
	let logStatements = [];
	// 检测console的正则表达式
	const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?/g;
	let match;
	// 正则循环匹配页面文本
	while (match = logRegex.exec(documentText)) {
		// 每次匹配到当前的范围--Range
			let matchRange =
				new vscode.Range(
					document!.positionAt(match.index),
					document!.positionAt(match.index + match[0].length)
				);
			if (!matchRange.isEmpty) {logStatements.push(matchRange);}
	
				
		}
		return logStatements;

}
