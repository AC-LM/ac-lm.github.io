---
title: BUG(1)—无头浏览器导致的元素不可见
date: 2020-11-25
author: LM
---

## BUG 描述

WebDriver 在使用 headless 时，默认会将窗口设置为 **0x0**，并且处于 **Minimized** 状态。这样会导致程序启动后，部分元素由于没有打印而无法被点击的异常

## Resolution

在启动 WebDriver 时先配置浏览器大小

```python
options.add_argument("--headless")
options.add_argument('window-size=1920x1080')
options.add_argument('--start-maximized')
# 警告，针对不同内核方法可能有差别，但参数一致。
```

