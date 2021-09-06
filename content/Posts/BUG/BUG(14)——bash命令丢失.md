---
title: BUG(14)——bash命令丢失
date: 2021-01-14
author: LM
---

## BUG描述

在Linux shell 中执行ls命令时，报错 `bash：ls command not found`

## Resolution

由于环境变量PATH被错误修改，导致命令丢失

```python
# 命令行执行，恢复环境变量
export PATH=/bin:/usr/bin:$PATH
```

