---
title: BUG(16)——xlrd模块无法打开.xlsx文件
date: 2021-03-31
author: LM
---

## BUG描述

xlrd模块更新后，无法打开.xlsx文件，报错 `xlrd.biffh.XLRDError: Excel xlsx file；not supported`

## Resolution

xlrd在更新到了2.0.1版本后只支持.xls文件，若要打开.xlsx文件需要安装旧版xlrd，执行

```python
pip uninstall xlrd
pip install xlrd==1.2.0
```