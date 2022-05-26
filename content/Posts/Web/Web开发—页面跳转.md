---
title: Web开发—页面跳转
date: 2020-12-05
author: LM
tags: ["Web", "Javascript"]
---

## 1.页面跳转（原页面跳转）

### 通过 a 标签实现

```html
<a href="https://www.baidu.com">BAT</a>
```

### 通过 window.location.href 实现

```javascript
window.location.href="https://www.baidu.com";
```

## 2.页面跳转 （打开新标签页）

### 通过 a 标签实现

```html
<a href="https://www.baidu.com" target="_blank">BAT</a>
```

### 通过 window.open() 实现

```javascript
window.open("https://www.baidu.com");
```