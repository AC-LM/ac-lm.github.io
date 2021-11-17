---
title: Cypress(1)——安装示例
date: 2021-09-10
author: LM
---

## Cypress

需要环境 `node.js`，安装 > [Node.js (nodejs.org)](https://nodejs.org/zh-cn/)

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

