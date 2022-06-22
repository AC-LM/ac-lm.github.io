---
title: Web开发—JavaScript 修改 CSS 的三种方法
date: 2022-06-20
author: LM
tags: ["Web", "Javascript"]
---

## 1.style.cssText

```javascript
div.style.cssText='width:250px;height:250px;';
```

## 2.style.setProperty()

```javascript
div.style.setProperty('width','250px');
div.style.setProperty('height','250px');
```

## 3.style.property

```javascript
div.style.width = "250px";
div.style.height = "250px";     
```

