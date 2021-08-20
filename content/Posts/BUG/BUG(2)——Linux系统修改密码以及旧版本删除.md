---
title: BUG(2)——Linux系统修改密码以及旧版本删除
date: 2020-12-01
author: LM
---

## CentOS7进入单用户模式修改密码

在选择系统界面，按 `E` 进入启动配置，定位到命令 `Ro` ，将其改为 `rw init=/sysroot/bin/sh`，`Ctrl+X`进行重启，进入单用户模式，执行`chroot /sysroot`进入系统目录，输入`passwd root`修改密码，`touch /.autorelabel`执行修改

## 升级后的旧版本删除

centos7开机界面出现多个选项时，前面几个选项正常启动，最后一个选项急救模式启动（系统出项问题不能正常启动时使用并修复系统），在CentOS更新后,并不会自动删除旧内核。所以在启动选项中会有多个内核选项,可以手动使用以下命令删除多余的内核:

```bash
uname -a
rpm -qa | grep kernel  #查看安装内核
yum remove kernel-3.10.0-229.14.1.el7  #删除
reboot #重启
```

