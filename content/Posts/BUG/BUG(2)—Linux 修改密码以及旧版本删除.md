---
title: BUG(2)—Linux 修改密码以及旧版本删除
date: 2020-11-26
author: LM
tags: ["Bug"]
---

## BUG 描述

CentOS7 进入单用户模式修改密码

## Resolution

在选择系统界面，按 `E` 进入启动配置，定位到命令 `Ro` ，将其改为 `rw init=/sysroot/bin/sh`，`Ctrl+X`进行重启，进入单用户模式，执行`chroot /sysroot`进入系统目录，输入`passwd root`修改密码，`touch /.autorelabel`执行修改

------

## BUG 描述

centos7 开机界面有时会出现多个选项，这是由于更新导致的。列表中前几个选项为系统旧版本，最后为急救模式启动。

在 CentOS 中，系统更新后并不会自动删除旧内核，因此启动选项中会有多个内核的选项，用户可以手动进行删除。

## Resolution

```bash
uname -a
rpm -qa | grep kernel  # 查看安装内核
yum remove kernel-3.10.0-229.14.1.el7  # 删除
reboot # 重启
```

