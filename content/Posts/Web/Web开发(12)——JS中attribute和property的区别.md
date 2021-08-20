---
title: Web开发(12)——JS中attribute和property的区别
date: 2021-07-24
author: LM
---

> 参考原文：[ JS中attribute和property的区别  @L_mj ](https://www.cnblogs.com/lmjZone/p/8760232.html)

## 1.介绍

`property`属性和`attribute`特性非常容易混淆，但两者不是同一个东西，`property`是DOM中的属性，是JavaScript里的对象；`attribute`是HTML标签上的特性，它的值只能够是字符串；简单理解，`attribute`就是DOM节点自带的属性，例如HTML中常用的`id、class、title、align`等。而`property`是这个DOM元素作为对象，其附加的内容，例如`childNodes、firstChild`等。

```html
<div id="div1" class="divClass" title="divTitle" title1="divTitle1"></div>
```

如上述的`div`标签，当我们使用`var in1=document.getElementById("div1")`获取这个元素并打印时`console.log(in1)`，可以看到如下图的属性。

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210724112511.png)

可以发现有一个名为`attributes`的属性，类型是`NamedNodeMap`，同时也可以找到标签自带的属性`id`和`className`、但明显没有`titles`这个自定义的属性。这是因为每一个DOM对象在创建的时候，只会创建如`id, className`这些基本属性，而们在TAG标签中自定义的属性是不会直接放到DOM中的。我们可以在`attributes`属性中找到我们自定义的属性。

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210724113029.png)

从这里就可以看出，**`attributes`是属于`property`的一个子集**，它保存了HTML标签上定义属性。

## 2.设置

常用的`attribute`，例如`id、class`等，已经被作为`property`附加到DOM对象上，可以和`property`一样取值和赋值。

### attribute取值赋值

使用setAttribute()和getAttribute()进行操作，注意，`setAttribute()`的两个参数，都必须是字符串。

```javascript
 var id = div1.getAttribute("id");              
 var className1 = div1.getAttribute("class");
 var title = div1.getAttribute("title");
 var title1 = div1.getAttribute("title1");   //自定义特性
 div1.setAttribute('class', 'a');
 div1.setAttribute('title', 'b');
 div1.setAttribute('title1', 'c');
 div1.setAttribute('title2', 'd');
```

### property取值赋值

property取值赋值只需要使用.就可以了。对属性`property`可以赋任何类型的值。

```javascript
 var id = div1.id;
 var className = div1.className;
 var childNodes = div1.childNodes;
 var attrs = div1.attributes;
div1.className = 'a';
div1.align = 'center';
div1.AAAAA = true;
div1.BBBBB = [1, 2, 3];
```

## `property`和`attribute`的联系

- `property`能够从`attribute`中得到同步；
- `attribute`不会同步`property`上的值；
- `attribute`和`property`之间的数据绑定是单向的，`attribute->property`；
- 更改`property`和`attribute`上的任意值，都会将更新反映到HTML页面中；

```javascript
// 如下，更改 property 的值不能更改 attribute 的值
in1.value='new value of prop';
console.log(in1.value);               // 'new value of prop'
console.log(in1.attributes.value);    // 1
// 相反，更改 attribute 的值不能更改 property 的值
in2.setAttribute('value','ni')
console.log(in2.value);          //ni
console.log(in2.attributes.value); //value='ni'
```

