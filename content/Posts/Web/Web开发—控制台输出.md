---
title: Web开发—控制台输出
date: 2021-08-26
author: LM
tags: ["Web", "Javascript"]
---

## 1.清空控制台

```
console.clear()
clear()
```

## 2.信息输出

```
console.log()         用于输出普通信息
console.info()         用于输出提示性信息
console.error()       用于输出错误信息
console.warn()       用于输出警示信息
console.debug()     用于输出调试信息
```

## 3.换行

`shift` +  `enter`

## 4.占位符

支持`字符 %s`、`整数 %d %i`、`浮点数 %f `和`对象 %o `四种

```
console.log('%d年%d月%d日', 2011,3,26); 
console.log('圆周率是%f', 3.1415926);
```

## 5.断言

```
let isDebug = false;
console.assert(isDebug, '为false时输出的信息');
```

