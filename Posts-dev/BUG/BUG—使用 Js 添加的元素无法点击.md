---
title: BUG—使用 Js 添加的元素无法点击
date: 2021-07-23
author: LM
tags: ["Bug"]
---

## BUG 描述

在使用`append()`添加元素后，该元素的点击事件无法被监听生效

## Resolution

这些因为，这些动态加载的元素是在`css, js`代码加载完后才添加的。因此当浏览器在解析`js`代码时，这些动态添加的元素并未生成，从而也无法绑定相应的事件，事件也就不会触发。

通过对`body`绑定事件解决该问题

```javascript
$("body").on("click", '.addBtn', function(){
    alert('new')
})
```

> 参考原文：[ js添加HTML元素时出现的无效的点击事件 @wttwuhn ](https://juejin.cn/post/6844903703896391687)

