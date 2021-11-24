---
title: BUG(13)—Linux中Chrome无法启动缺少权限
date: 2021-01-13
author: LM
---

## BUG 描述

linux 下 Python 脚本 selenium 无法启动 Chrome，报错

`unknown error: DevToolsActivePort file doesn't exist`

## Resolution

Chrome 在 Linux 下权限不足，需要添加以下属性以 Root 运行

```python
options.add_argument('--no-sandbox')  # 不在沙盒运行，以 Root 权限运行
```

