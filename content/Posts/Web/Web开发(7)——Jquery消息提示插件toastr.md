---
title: Web开发(7)——Jquery消息提示插件toastr
date: 2021-06-04
author: LM
---

> 参考文献： [ github-toastr @CodeSeven ](https://github.com/CodeSeven/toastr)

toastr是一个基于jQuery简单、漂亮的消息提示插件，使用简单、方便，可以设置超时时间自动消失。

## 1.引入toastr的js、css文件

```javascript
<script src="<%=path%>/res/toastr/toastr.min.js"></script>
<link rel="stylesheet" href="<%=path%>/res/toastr/toastr.min.css">
```

## 2.使用

```javascript
//常规消息提示，默认背景为浅蓝色  
toastr.info("你有新消息了!");  

//成功消息提示，默认背景为浅绿色 
toastr.success("你有新消息了!");  

//警告消息提示，默认背景为橘黄色 
toastr.warning("你有新消息了!");  

//错误消息提示，默认背景为浅红色 
toastr.error("你有新消息了!");  

//带标题的消息框
toastr.success("你有新消息了!","消息提示");  

//另一种调用方法
toastr["info"]("你有新消息了!","消息提示");
```

## 3.自定义参数

```javascript
toastr.options = {  
        closeButton: false,  
        debug: false,  
        progressBar: true,  
        positionClass: "toast-bottom-center",  
        onclick: null,  
        showDuration: "300",  
        hideDuration: "1000",  
        timeOut: "2000",  
        extendedTimeOut: "1000",  
        showEasing: "swing",  
        hideEasing: "linear",  
        showMethod: "fadeIn",  
        hideMethod: "fadeOut"  
    };  
```

##  4.参数说明

```javascript
closeButton：false，是否显示关闭按钮（提示框右上角关闭按钮）； 
debug：false，是否为调试； 
progressBar：false，是否显示进度条（设置关闭的超时时间进度条）； 
positionClass，消息框在页面显示的位置
toast-top-left  顶端左边
toast-top-right    顶端右边
toast-top-center  顶端中间
toast-top-full-width 顶端，宽度铺满整个屏幕
toast-botton-right  
toast-bottom-left
toast-bottom-center
toast-bottom-full-width
onclick，点击消息框自定义事件
showDuration: “300”，显示动作时间
hideDuration: “1000”，隐藏动作时间
timeOut: “2000”，自动关闭超时时间
extendedTimeOut: “1000”
showEasing: “swing”,
hideEasing: “linear”,
showMethod: “fadeIn” 显示的方式，和jquery相同
hideMethod: “fadeOut” 隐藏的方式，和jquery相同
```