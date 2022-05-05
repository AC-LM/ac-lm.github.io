---
title: BUG—Linux 修改密码
date: 2020-11-26
author: LM
tags: ["Bug"]
---

## BUG 描述

CentOS7 进入单用户模式修改密码

## Resolution

在选择系统界面，按 `E` 进入启动配置，定位到命令 `Ro` ，将其改为 `rw init=/sysroot/bin/sh`，`Ctrl+X`进行重启，进入单用户模式，执行`chroot /sysroot`进入系统目录，输入`passwd root`修改密码，`touch /.autorelabel`执行修改

