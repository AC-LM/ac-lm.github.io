---
title: Web开发(4)——JS实现页面跳转
date: 2020-12-05
author: LM
---

## 1 页面跳转（原页面跳转）

### （1）a标签实现

```html
<a href="https://www.baidu.com">BAT</a>
```

### （2）window.location.href实现

```javascript
window.location.href="https://www.baidu.com";
```

## 2 页面跳转 （打开新标签页）

### （1）a标签实现

```html
<a href="https://www.baidu.com" target="_blank">BAT</a>
```

### （2）window.open()实现

```javascript
window.open("https://www.baidu.com");
```