---
title: Python(20)—Web LocalStorage 修改
date: 2021-01-16
author: LM
---

## 1.目标

修改 LocalStorage 和 SessionStorage 中的 token

![](https://gitee.com/LM-J/drawingbed/raw/master/img/31.png)

## 2.实现

使用 JavaScript 进行获取 token 和修改 token 的操作

```javascript
1.设置localStorage
      Storage.set = function(name, val) {
        localStorage.setItem(name, val);
      }
2.获取localStorage
      Storage.get = function(name) {
        return localStorage.getItem(name);
      }
3.调用函数
      Storage.set("status", "OK");
      Storage.set("quit", "...");
      console.log(Storage.get("status"));

```
