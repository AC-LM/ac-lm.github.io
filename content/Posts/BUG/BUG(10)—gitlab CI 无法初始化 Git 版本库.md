---
title: BUG(10)——gitlab CI 无法初始化 Git 版本库
date: 2021-01-05
author: LM
---

## BUG描述

gitlab CI 报错

```shell
fatal: git fetch-pack: expected shallow list
fatal: The remote end hung up unexpectedly
```

## Resolution

这是由于 git 版本过老不支持新的 API，需要升级 git

```shell
#安装源
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
#安装git
yum install git
#更新git
yum update git
```

> 参考原文：[ fatal: git fetch-pack: expected shallow list  @0neBean ](https://www.jianshu.com/p/30b6771178cf)
