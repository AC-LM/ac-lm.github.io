---
title: Web开发—获取节点
date: 2022-01-23
author: LM
tags: ["Web", "Javascript"]
---

## 1.获取子节点

### a.通过获取 dom 方式直接获取子节点

```javascript
var a = document.getElementById("test").getElementsByTagName("div");
```

### b. 通过 childNodes 获取子节点

```javascript
var b =document.getElementById("test").childNodes;
```

### c.通过 children 来获取子节点

```javascript
var getFirstChild = document.getElementById("test").children[0];
```

## 2.获取父节点

### a.parentNode 获取父节点

```javascript
var p = document.getElementById("test").parentNode;
```

## 3.获取兄弟节点

### a.通过获取父亲节点再获取子节点来获取兄弟节点

```javascript
var brother1 = document.getElementById("test").parentNode.children[1];
```

### b.获取上一个兄弟节点

```javascript
var brother2 = document.getElementById("test").previousElementSibling;
```

### c.获取下一个兄弟节点

```javascript
var brother4 = document.getElementById("test").nextElementSibling;
```

