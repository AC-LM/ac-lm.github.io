---
title: Web开发(17)—scrollIntoView 视图滚动
date: 2022-01-24
author: LM
---

## 1.scrollIntoView()

`scrollIntoView()`方法可以将调用它的元素滚动到浏览器窗口的可见区域。

```javascript
var element = document.getElementById("box");
 
element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({block: "end"});
element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
```

