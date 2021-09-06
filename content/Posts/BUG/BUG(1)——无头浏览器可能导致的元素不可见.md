---
title: BUG(1)——无头浏览器导致的元素不可见
date: 2020-11-25
author: LM
---

## BUG描述

WebDriver在使用headless状态时，会将窗口设置为**默认大小为0x0，并且处于Minimized状态**，这样做会导致程序启动后部分元素无法被点击等异常

## Resolution

在启动Driver配置浏览器大小

```python
options.add_argument("--headless")
options.add_argument('window-size=1920x1080')
options.add_argument('--start-maximized')
#警告，针对不同内核方法可能有差别，但参数一致。
```

