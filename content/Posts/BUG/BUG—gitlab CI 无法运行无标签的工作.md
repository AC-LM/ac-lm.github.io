---
title: BUG—gitlab CI 无法运行无标签的工作
date: 2021-01-06
author: LM
tags: ["Bug"]
---

## BUG 描述

gitlab CI 无法执行没有标记标签的工作

## Resolution

在设置中勾选 `Run untagged jobs`

gitlab 项目设置 -> CI/CD -> Runner，点击编辑按钮，修改 `Run untagged jobs / Indicates whether this runner can pick jobs without tags`

