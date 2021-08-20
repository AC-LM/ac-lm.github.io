---
title: BUG(3)——Windows下编写的shell脚本无法在Linux中运行
date: 2020-12-02
author: LM
---

## BUG描述

Windows下使用记事本编写shell脚本，上传到Linux系统后，无法运行，结果返回错误。

## Resolution

注意到的是，在编辑文件时，Windows系统编码中回车比Linux多一个 \r  ( **即Windows下的回车会编码成【\n\r】，而Linux系统中回车是【\n】**)，正因如此，Windows下编写了的shell脚本无法在Linux下运行。

