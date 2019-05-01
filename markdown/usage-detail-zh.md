---
title: '使用详情'
date: '2019-04-30T13:43:31.126Z'
path: '/usage-detail-zh'
---

哈，Gatsby 相当不错！作为一名使用 React 的开发者，我开始尝试使用 gatsby 转化 markdown 来生成自己的博客。也许它也适合你，要是一下吗？

_没有达到你的要求？或者你可以看看那些 [官方及社区创建的起步示例](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 快速开始

1.  **创建一个 Gatsby 站点.**

    使用 Gatsby 命令来创建一个新的站点，指定一个 gatsby 模板 (其实就是一个 github 仓库地址)。

    > 在这之前，你需要有一个 `node` 环境和 `npm` 命令。更多详情移步 [nodejs.org](https://nodejs.org/en/download/)。

    ```bash
    # 使用 gatsby-blog-ghlandy 模板创建 gatsby 站点
    npx gatsby new my-gatsby-blog https://github.com/GHLandy/gatsby-blog
    ```

1.  **安装依赖包.**

    ```bash
    my-gatsby-blog
    npm i
    ```

1.  **填写自己站点的基本信息.**

    使用自己最喜欢的编辑器，比如 vim，编辑根目录的 `config.js`：

    ```bash
    vim config.js
    ```

    如下：

    ```javascript
    module.exports = {
      title: '自己站点的标题',
      description: '自己站点的描述',
      author: '自己的昵称',
    };
    ```

1.  **写一篇自己的文章.**

    所有的发布文章都以 markdown 放在根目录的 markdown 文件下面。您可以简单的复制并修改一下默认的 `usage-detail.md` 文件来达到发布一片文章的目的，不过需要注意一下每个 markdown 的扉页信息，它有如下三项需要填写：

    ```markdown
    ---
    title: '使用详情'
    date: '2019-04-30T13:43:31.126Z'
    path: '/usage-detail-zh'
    ---
    ```

    `title` 将显示在文章详情页面。

    `date` 的标准格式为 `ISOString`，像 js 的 `new Date().toISOString()` 那样。当然像 `2019-04-27` 或者 `2019-04-27 04:11:22` 这样的格式也可以的。

    `path` 是 URL 中的路径，在浏览器地址栏中显示为 `http://example.com/usage-detail-zh`，确保每个 markdown 中填写不同的值哦。

1.  **预览和构建博客.**

    预览只需运行 `npm start`，浏览器打开 `http://localhost:8000` 即可。

    运行 `npm bun build` 来构建，生成的文件在 `public` 目录中，然后就可以那些文件部署了，当然可以使用 `netlify`来完成部署。

## 🧐 项目中有啥儿？

Gatsby 的项目结构如下：

    .
    ├── markdown
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── config.js
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md

1.  **`/markdown`**: 要发布的 markdown 格式文章。

2.  **`/node_modules`**: 依赖包目录。

3.  **`/src`**: 前端页面模板相关的源码目录。

4.  **`.gitignore`**: 告诉 git 忽略指定文件。

5.  **`.prettierrc`**: [Prettier](https://prettier.io/) 格式化代码工具配置文件。

6.  **`config.js`**: 关于站点信息的简单配置文件。

7.  **`gatsby-browser.js`**: 请移步 [Gatsby 浏览器 API](https://www.gatsbyjs.org/docs/browser-apis/)。

8.  **`gatsby-config.js`**: 请移步 [配置文档](https://www.gatsbyjs.org/docs/gatsby-config/)。

9.  **`gatsby-node.js`**: 请移步 [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)。

10.  **`gatsby-ssr.js`**: 请移步 [Gatsby server-side rendering API](https://www.gatsbyjs.org/docs/ssr-apis/)。

11.  **`LICENSE`**: MIT license。

12. **`package-lock.json`**: 依赖版本锁定文件 **(不需要理会)**

13. **`package.json`**: 项目相关信息、依赖信息文件。

14. **`README.md`**: README 文件。

## 🎓 学习 Gatsby

需要更多指南信息？详细文档请移步 [gatsbyjs 站点](https://www.gatsbyjs.org/)。您也可以参考以下链接：

- **对与多数的开发者，我们建议从 [使用 Gatsby 一步一步创建站点](https://www.gatsbyjs.org/tutorial/) 开始.** 它从零开始，为你展示每一步的细节。

- **直接深入代码，请移步 [我们的文档](https://www.gatsbyjs.org/docs/).** 需要指出的是，记得展开阅读侧边栏的 _指南 (Guides)_、_API 参考 (API Reference)_ 及 _高级教材 (Advanced Tutorials)_。
