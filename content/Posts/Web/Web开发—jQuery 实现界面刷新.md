---
title: Web开发—jQuery 实现界面刷新
date: 2021-07-23
author: LM
tags: ["Web", "Javascript"]
---

## 1.使用`Load`实现的局部刷新

在`jQuery`中`load`方法可以加载本地`Html`文件里的某个元素，使用这个特性可以实现`Html`的局部更新

```javascript
$("#content").load("list .table")
```

## 2.使用`location`实现全局刷新

```javascript
window.location.reload()
```

