---
title: BUG—Wapiti 报告丢失 js 文件
date: 2020-11-30
author: LM
tags: ["Bug"]
---

## BUG描述

在 wapiti 的 3.0.4 版本中：`HTTP request and cURL command hidden on html report`，HTTP 报告缺少 js 文件

## Resolution

需手动从目录 `wapitiCore/report_template` 中找到并添加

> Ok, when generating the html report it is supposed to copy the js file from wapitiCore/report_template into output directory, that is why it was missing.

> 参考文献：[ github-wapiti-issues @Maxime Alay-Eddine ](https://github.com/wapiti-scanner/wapiti/issues/86)
