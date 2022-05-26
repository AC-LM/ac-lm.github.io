---
title: Web开发—获取节点
date: 2022-01-23
author: LM
tags: ["Web", "Javascript"]
---

## 1.通过获取 dom 方式直接获取子节点

```javascript
var child = document.getElementById("test").getElementsByTagName("div");
```

## 2. 通过 childNodes 获取子节点

```javascript
var child =document.getElementById("test").childNodes;
```

## 3.通过 children 来获取子节点

```javascript
var child = document.getElementById("test").children[0];
```

## 4.通过 parentNode 获取父节点

```javascript
var parent = document.getElementById("test").parentNode;
```

## 5.通过获取父节点再获取子节点来获取兄弟节点

```javascript
var brother = document.getElementById("test").parentNode.children[1];
```

## 6.获取上一个兄弟节点

```javascript
var brother = document.getElementById("test").previousElementSibling;
```

## 7.获取下一个兄弟节点

```javascript
var brother = document.getElementById("test").nextElementSibling;
```

