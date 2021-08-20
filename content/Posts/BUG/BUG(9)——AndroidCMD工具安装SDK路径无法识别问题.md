---
title: BUG(9)——AndroidCMD工具安装SDK路径无法识别问题
date: 2020-11-21
author: LM
---

> 参考原文：[ cmdline-tools : could not determine SDK root  @stackoverflow ](https://stackoverflow.com/questions/65262340/cmdline-tools-could-not-determine-sdk-root)

## BUG描述

执行 Android cmd 工具中 sdkmanager 命令时无法找到对应路径

```shell
Error: Could not determine SDK root. 
Error: Either specify it explicitly with --sdk_root= or move this package into its expected location: \cmdline-tools\latest\
```

## Resolution

Since new updates, there are some changes that are not mentioned in the documentation. After unzipping the command line tools package, the top-most directory you'll get is cmdline-tools. 

Rename the unpacked directory from **cmdline-tools** to **tools**, and place it under $C:/Android/cmdline-tools

**使目录 $C:/Android/cmdline-tools/tools**

and it will work perfectly.

