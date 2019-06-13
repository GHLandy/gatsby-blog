---
title: '我搞了一个命令行工具'
date: '2019-06-13T14:58:45.905Z'
path: '/my-flhc-cli'
---

嘿，最近我搞了个命令行给自己使用。好吧，它比较简陋，不过刚好合适我自己使用需求。代码实现详见
[flhc-cli](https://github.com/GHLandy/flhc-cli.git) [![NPM version][npm-image]][npm-url]
另外，配置文件存放在 [personal-misc](https://github.com/GHLandy/personal-misc.git)

[npm-image]: https://img.shields.io/npm/v/flhc-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/flhc-cli

## 背景

我自己的笔记本上偶尔会使用到 `vim`，并且自己做了一些配置，安装了一下插件。作为一枚野生菜鸡程序猴，
我使用 `Atom` 编辑器来完成日常工作，这个编辑器的插件我是通过 `git clone` 的方式来安装，因为
这样安装速度快一点。

那么问题来了，家里的笔记本、公司的台式机，嗯，还有一个 `Raspberry pi 3`，还有时会有一些 `vm`
虚拟机。我想在这些机子上同步配置，怎么办？简单啊，把配置保存起来，拿到新环境就行了。

好吧，这样会需要复制一下配置文件，然后在单独去拉去插件，烦啊！

搞个 `bash` 脚本啊，好吧，之前高过一个用来下载 `Atom` 插件，技术不好，勉强能用。

诶，作为前端程序猴，拿 `Nodejs` 搞吧。

## 怎么搞它

要纯粹用 `Nodejs` 手撸一个吗，好像也不会比使用 `bash` 简单多少。

刚好前段时间比较空闲，趁着划水的时间，粗略查阅了 `@vue/cli`、`create-umi`、`egg-bin` 的源
码，简单了解一下它的实现方式，发现了 `commander`、`yargs-parser`、`common-bin` 这些东西。

嘿嘿嘿，好像看起来挺顺手的，拿来用呗。

## 说搞就搞

最初版的时候直接拿了 `command` 弄，那时候叫做 `flhc-helper`, 做了个同步 `Atom` 插件同步。
后来阅读 `egg-bin` 发现 `common-bin`，顿时惊为天物，遂删除了 `flhc-helper`, 重新写了现在
的 `flhc-cli`。

刚开始的时候，对于复制配置文件，使用了 `createReadStream`、`createWriteStream` 以及
`common-bin` 封装了统一报错的 `spawn` 来做，因为当时不想去引太多库。并想别从 `.vimrc` 文件
中去读取插件的仓库地址。不过这个做法现在在代码里边已经看不到，提交删除掉了。

后边是把 `Atom`、 `vim` 的配置文件相应的插件仓库地址信息单独的保存了，详见上文提到的配置仓库。
这样之后，使用 `shelljs` 来做复制，用起来用点显示 `bash shell`。

目前，命令如下图：

![](https://images.ghlandy.com/my-flhc-cli.png)

主要完成功能：

- `flhc vim`: 同步 `vim` 配置，并自动拉取相应的插件
- `flhc atom`: 拉取 `Atom` 插件并安装插件相应的依赖

然后就是，我可以快乐的使用它了，只需要在有更新配置的时候提交到配置仓库即可，LGTM。
