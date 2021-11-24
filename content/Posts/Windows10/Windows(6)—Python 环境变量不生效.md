---
title: Windows(6)——Python 环境变量不生效
date: 2021-08-27
author: LM
---

> 参考原文：[ 命令窗口不能使用Python ](https://zhuanlan.zhihu.com/p/380716375)

## 问题

已在 Window10 上下载配置好 Python，但是在命令行 CMD 中使用 Python 命令时提示`Python not found; run without arguments to install from the Microsoft Store`，已确认 Python 的环境变量已配置。

## 解决

环境变量的优先级问题，WindowsApp 的路径优先于 Python，调换即好。

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210826113848.png)
