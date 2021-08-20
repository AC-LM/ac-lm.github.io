---
title: BUG(13)——Linux中Chrome无法启动缺少权限
date: 2021-01-13
author: LM
---

## BUG描述

linux下Python脚本selenium无法启动Chrome，报错unknown error: DevToolsActivePort file doesn't exist

## Resolution

Chrome在Linux下权限不足，需要添加以下属性以Root运行

```python
options.add_argument('--no-sandbox') # 不在沙盒运行，以Root权限运行
```

