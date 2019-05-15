---
title: 'Editorconfig、Prettier、Eslint 及 Pre-commit'
date: '2019-05-15T15:09:39.812Z'
path: '/editorconfig-prettier-eslint-hook'
---

> 记录一下杂项，聊以备忘，便于后查

一个人写代码还好，反正用的同一个编辑器，最后的格式都差不多。

不过对于强迫症、正规流程来说，这个其实是不可接受的。比如，就拿注释来说，写的是 `//注释内容` 还是 `// 注释内容`，有着一大堆争议。个人而言，是强迫手动格式化成后者的。

文件中变量命名是 `ImAVar`、`imAVar` 还是 `im_a_var`，优势一堆争议。

好吧，写代码怎么能吧时间浪费这些事情上面呢，肯定需要一些工具啊、库啊来进行统一啦。

## `Editorconfig`

这玩意儿，指定编辑器保存文件时的格式，以 `.editorconfig` 配置文件放在项目根目录。不过[有些编辑器需要下载相应的插件](https://editorconfig.org/#download)来获得支持。

配置形如：

```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.py]
indent_size = 4

[Makefile]
indent_style = tab
```

## `Prettier`

这货用来做更细致化的格式化，它也会读取 `.editorconfig`，其配置文件一般为 [`.prettierrc`](https://github.com/GHLandy/personal-misc/blob/master/prettierrc) 或者 [`prettier.config.js`](https://github.com/GHLandy/personal-misc/blob/master/prettier.config.js), 配置文件中的设置优先于 `.editorconfig`。

将配置文件丢到项目根目录，同时安装 `prettier` 为 `devDenpendencies`:

```bash
npm i -D prettier
```

`prettier.config.js` 配置形如：

```javascript
// Options: https://prettier.io/docs/en/options.html
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
}
```

可以在 `package.json` 配置一条用于格式化的命令：

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,css,md}\"",
  }
}
```

运行 `npm run format` 格式化项目中所有的 `.js`、`.jsx`、`.css`、`.md` 文件，需要在 `.prettierignore` 中过滤掉那些打包生成的文件、临时文件等。

## Eslint

在项目根目录安装 `eslint` 为 `devDenpendencies`，然后运行初始化，按照提示做相应的选择，它会下载相应的依赖:

```bash
npm i -D eslint
./node_modules/.bin/eslint --init
```

安装 `prettier` 的相关包：

```bash
npm i -D eslint-config-prettier eslint-plugin-prettier
```

向 `eslint` 的配置的 `extends`、`plugins` 和 `rules` 字段添加相应的配置，完成 `eslint` 集成 `prettier`，大致形如：

```javascript
module.exports = {
  // ...
  extends: ['airbnb', 'plugin:prettier/recommended'],
  // ...
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 2,
  },
}
```

可以在 `package.json` 配置一条用于格式化的命令：

```json
{
  "scripts": {
    "lint": "eslint --fix \"**/*.{js,jsx}\"",
  }
}
```

运行 `npm run lint` 检查并尝试修复项目中所有的 `.js`、`.jsx` 文件的错误，需要在 `.eslintignore` 中过滤掉那些打包生成的文件、临时文件等。

## Pre-commit

主要使用 `husky` 和 `lint-staged` 来做提交前的检查。

连同上述两个配置后，`package.json` 大致如下：

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,css,md}\"",
    "lint": "eslint --fix \"**/*.{js,jsx}\"",
    "lint-staged": "lint-staged",
  },
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.2.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-prettier": "^3.0.1",
    "husky": "^2.2.0",
    "lint-staged": "^8.1.6",
    "prettier": "^1.17.0"
  },
  "lint-staged": {
    "**/*.js": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
  }
}
```

最后，愉快的使用咯。
