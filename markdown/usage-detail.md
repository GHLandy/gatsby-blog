---
title: 'Usage Detail'
date: '2019-04-27T04:11:22.348Z'
path: '/usage-detail'
---

Yeah, Gatsby is great! As a developer using react, I've tried to use gatsby to generate my blog from markdown. Maybe it's good for you, have a try?

_Not meeting your need? You may want to check out vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying a gatsby template.

    This need a `node` environment and `npm` tool. Move to [nodejs.org](https://nodejs.org/en/download/) for detail.

    ```bash
    # create a new Gatsby site using the gatsby-blog-ghlandy
    gatsby new my-gatsby-blog https://github.com/GHLandy/gatsby-blog
    ```

1.  **Install dependencies.**

    ```bash
    cd my-gatsby-blog
    npm i
    ```

1.  **Fill your site info.**

    Use your favorite editor, vim for example, to edit `config.js`,

    ```bash
    vim config.js
    ```

    as below,

    ```javascript
    module.exports = {
      title: 'your site title',
      description: 'your site description',
      author: 'you nickname',
    }
    ```

1.  **Write your personal post.**

    All posts are markdown file under the markdown directory. To write a post, you can simply dumplicate or modify the default `usage-detail.md` file as wish. What you need to keep in mind is the markdown frontmatters. Each post markdown need three frontmatters as below,

    ```markdown
    ---
    title: 'Usage Detail'
    date: '2019-04-27T04:11:22.348Z'
    path: '/usage-detail'
    ---
    ```

    Post page will display the `title`.

    The standard `date` need to be formatted as a ISOString, like `new Date().toISOString()` in js. And it works in the format of `2019-04-27` or `2019-04-27 04:11:22`.

    The `path`, at last, will be displayed in the location bar of browser, `http://example.com/usage-detail`, for example.

1.  **preview and build you blog.**

    To preview, run `npm start` and your sit will run at `http://localhost:8000`

    To Build, run `npm bun build`. All static files are store under the public directory. Just deplay it to your server, or build with `netlify`, etc.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

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

1.  **`/markdown`**: Posts markdown file.

2.  **`/node_modules`**: Dependencies.

3.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

4.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

5.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

6.  **`.prettierrc`**: A simple config file of site info.

7.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

8.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

9.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

10. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

11. **`LICENSE`**: This blog template is licensed under the MIT license, powered by Gatsby.

12. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

13. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

14. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
