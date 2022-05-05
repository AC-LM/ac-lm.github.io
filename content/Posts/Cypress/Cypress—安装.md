---
title: Cypress—安装
date: 2021-09-10
author: LM
tags: ["Cypress"]
---

## Cypress

Cypress 是使用现代 JavaScript 框架构建的前端测试工具。

## 环境

`node.js`，安装 > [Node.js (nodejs.org)](https://nodejs.org/zh-cn/)

## 安装

下载 [Cypress](https://docs.cypress.io/)，执行下列命令安装 

```shell
cd /your/project/path
npm install cypress --save-dev
# 将 cypress 工程依赖安装在工程目录下
./node_modules/.bin/cypress.cmd version
# Windows 下执行该命令
./node_modules/.bin/cypress version
# Linux 执行该命令
./node_modules/.bin/cypress.cmd install
# 安装 cypress 二进程应用程序，程序将会被安装在  C:\Users\13126\AppData\Local\Cypress\Cache\8.3.1\Cypress 以供全局使用
./node_modules/.bin/cypress.cmd open
npx cypress open
# 启动项目
```

