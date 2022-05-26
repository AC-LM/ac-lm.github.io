---
title: Web开发—定位点击位置
date: 2021-06-05
author: LM
tags: ["Web", "Javascript"]
---

## 1.实现

```javascript
$('body').click(function(even) { 
    // 在页面任意位置点击而触发此事件
    // even.target 表示被点击的目标
    console.log($(even.target).attr("id"))
})
```

