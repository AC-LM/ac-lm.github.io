---
title: BUG—Windows 的脚本无法在 Linux 运行
date: 2020-11-27
author: LM
tags: ["Bug"]
---

## BUG 描述

Windows 下使用记事本编写的 shell 脚本，在上传到 Linux 系统后，无法运行，结果返回错误。

## Resolution

这是由于 Windows 系统编码与 Linux 系统编码不同导致的，Windows 系统编码中回车会编码成 `\n\r`，而 Linux 系统中回车则是 `\n`，正因如此，Windows 下编写的 shell 脚本无法在 Linux 下运行。

