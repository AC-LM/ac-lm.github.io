---
title: BUG(21)——Linux缺少OpenSSL
date: 2021-09-17
author: LM
---

## BUG描述

在Linux编译某些软件时，会出现报错

`fatal error: openssl/ssl.h: No such file or directory centos`

## Resolution

这是缺少 OpenSSL 导致的，重新安装即可

要在Debian、Ubuntu或者其他衍生版上安装OpenSSL：

```shell
sudo apt-get install libssl-dev
```

要在 Fedora，CentOS 或者 RHEL 上安装OpenSSL开发包：

```shell
sudo yum install openssl-devel
```

安装完后，尝试重新编译程序。

# 