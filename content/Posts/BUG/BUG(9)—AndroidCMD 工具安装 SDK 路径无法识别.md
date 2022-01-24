---
title: BUG(9)—AndroidCMD 工具安装 SDK 路径无法识别
date: 2020-12-03
author: LM
tags: ["Bug"]
---

## BUG 描述

执行 Android cmd 工具 sdkmanager 命令时无法找到对应路径

```shell
Error: Could not determine SDK root. 
Error: Either specify it explicitly with --sdk_root= or move this package into its expected location: \cmdline-tools\latest\
```

## Resolution

Since new updates, there are some changes that are not mentioned in the documentation. After unzipping the command line tools package, the top-most directory you'll get is cmdline-tools. 

**Rename the unpacked directory from cmdline-tools to tools, and place it under $C:/Android/cmdline-tools**

> 参考原文：[ cmdline-tools : could not determine SDK root  @stackoverflow ](https://stackoverflow.com/questions/65262340/cmdline-tools-could-not-determine-sdk-root)

