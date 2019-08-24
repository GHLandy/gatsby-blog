---
title: 'localStorage, sessionStorage tools'
date: '2019-08-24T11:57:33.930Z'
path: '/ghlandy-storage-tools'
---

在工作中，前端项目上会经常用到 `localStorage` 和 `sessionStorage` 来存储一些信息，以备使用。
而且存储的类型会涉及到 `Boolean`、`String`、`Array` 以及 `Object`，除了 `String` 类型外，
其他的集中类型在存储的时候都需要给它序列化，获取的给它发序列话。经常这么样子去手动给要存储的东西
去 `JSON.stringify` 以及 `JSON.parse` 就显得略微繁琐，所以今天特地做了一个 `npm` 工具包，
把序列化和反序列化的操作屏蔽掉，使用工具的时候，原样输入原始类型即可。

## 工具包 `@ghlandy/storage`

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/@ghlandy/storage.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@ghlandy/storage
[codecov-image]: https://codecov.io/gh/GHLandy/ghlandy-storage/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/GHLandy/ghlandy-storage
[travis-image]: https://travis-ci.org/GHLandy/ghlandy-storage.svg?branch=master
[travis-url]: https://travis-ci.org/GHLandy/ghlandy-storage

目前工具包已经上传至 `npm` 仓库，通过如下命令安装：

```bash
npm i @ghlandy/storage
# or
yarn add @ghlandy/storage
```

然后通过 `import` 来使用：

```javascript
import storage from '@ghlandy/storage'
```

它提供了 4 个常用方法分别用以存储、获取 `localStorage` 和 `sessionStorage`:

- `storage.localSet`: 设置 `localStorage`
- `storage.localGet`: 获取 `localStorage`
- `storage.sessionSet`: 设置 `sessionStorage`
- `storage.sessionGet`: 获取 `sessionStorage`

## 示例 ([Docs](http://storage.ghlandy.com/))

```javascript
import storage from '@ghlandy/storage'

storage.localSet('bl', true)
storage.localGet('bl') // true

storage.localSet('str', 'this is a string.')
storage.localGet('str') // 'this is a string.'

storage.localSet('arr', [1, 2, 3, 4])
storage.localGet('arr') // [1, 2, 3, 4]

storage.localSet('obj', { a: 1, b: 2, c: 3 })
storage.localGet('obj') // { a: 1, b: 2, c: 3 }
```

`sessionSet` 和 `sessionGet` 与上述用法相似，替换为对应的方法名称即可。

## 兼容性

工具包其实没有做特殊的处理，仅仅只是为了屏蔽掉序列化和反序列化的操作而言。所以，对于那些低版本的
浏览器，没有 `window.localStorage` 和 `window.sessionStorage` 的话，使用这个工具是会
爆炸的。因为目前公式开发移动 `Web` 端、以及内部 `App` 的 `webkit` 都有这两个本地存储，所以
也就不去做处理了。

## 后记

- `scoped package`

之前传过一个非 `scoped` 的包 `flhc-cli`，登录之后直接 `npm publish` 即可，然后这种 `scoped`
的包默认是私有包，而我自己的 `npm` 帐号是一个 `Free Plan`，通过文档发现需要 `npm publish --access public`
才能上传为公共包。这算是一个注意点了。

- `codecov`

为了展示测试覆盖 (本文中的那几个 `badge`)，顺便学习了一下 `travis-ci` 和 `codecov` 的设置
