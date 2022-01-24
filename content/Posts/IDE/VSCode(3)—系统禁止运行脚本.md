---
title: VSCode(3)—系统禁止运行脚本
date: 2021-09-16
author: LM
tags: ["VSCode"]
---

## 错误描述

`node_modules/.bin/babel : 无法加载文件 D:\node\node_project\es6\node_modules\.bin\babel.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.co m/fwlink/?LinkID=135170 中的 about_Execution_Policies`

## 配置解决

- 以管理员身份运行 VSCode
- 执行：get-ExecutionPolicy，此时显示 Restricted，表示状态是禁止的
- 执行：set-ExecutionPolicy RemoteSigned
- 再执行 get-ExecutionPolicy，显示 RemoteSigned，表示状态启用

