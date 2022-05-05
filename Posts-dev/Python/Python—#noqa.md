---
title: Python—#noqa
date: 2021-11-18
author: LM
tags: ["Python"]
---

## #noqas

将 `#noqa` 添加到一行表示 IDE 的 linter 代码质量检查程序不应该检查此行，该代码可能生成的任何警告都将被忽略。

```python
import Nothing  #noqa
```

