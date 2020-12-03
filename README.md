# helloworld README

This is the README for your extension "helloworld". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**


{
	// 插件项目名
    "name": "firstextension",
	// 显示在应用市场的插件名，支持中文
    "displayName": "FirstExtension插件教程",
	// 插件描述
    "description": "a tutorial for extension",
	// 版本号
    "version": "0.0.1",
	// 表示插件最低支持的vscode版本
    "engines": {
        "vscode": "^1.50.0"
    },
	// 插件应用市场分类
    "categories": [
        "Other"
    ],
	// 插件图标，至少128x128像素（可选配）
    // "icon": "images/icon.png",
	// 插件的被动激活事件，可配*来保持在后台持续运行
    "activationEvents": [
        "onCommand:firstExt.hello"
    ],
	// 插件的主入口文件
    "main": "./out/extension.js",
	// 贡献点，整个插件最重要最多的配置项
    "contributes": {
		// 命令
        "commands": [
            {
                "command": "firstExt.hello",
                "title": "Hello World"
            }
        ],
		// 快捷键绑定，分为mac和win操作系统；when是触发的先决条件，可不配；
        "keybindings": [
            {
                "command": "firstExt.hello",
                "key": "ctrl+w",
                "mac": "cmd+shift+w",
                "when": "editorTextFocus"
            }
        ],
		// ---- 下面配置在后面小说案例中说明
		// 菜单
        "menus": {
			// 编辑器鼠标右键菜单
            "editor/context": [],
			// 编辑器右上角图标，不配置图片就显示文字
            "editor/title": [],
			// 编辑器标题右键菜单
            "editor/title/context": [],
			// 资源管理器右键菜单
            "explorer/context": []
        },
		// 自定义新的activitybar图标，也就是最左侧 图标栏
        "viewsContainers": {},
		// 自定义左侧侧边栏内view树的实现
        "views": {},
        // 插件自定义设置项，由用户配置后传参进入代码逻辑里，暂不展示
		"configuration": {},
    }
}


