---
title: Web开发—jQuery 消息提示插件 toastr
date: 2021-06-04
author: LM
tags: ["Web", "Javascript"]
---

> 参考文献： [ github-toastr @CodeSeven ](https://github.com/CodeSeven/toastr)

toastr 是一个基于 jQuery 简单、漂亮的消息提示插件，使用简单、方便，可以设置超时时间自动消失。

## 1.引入 toastr 的 js、css 文件

```html
<script src="<%=path%>/res/toastr/toastr.min.js"></script>
<link rel="stylesheet" href="<%=path%>/res/toastr/toastr.min.css">
```

## 2.使用

```javascript
// 常规消息提示，默认背景为浅蓝色  
toastr.info("你有新消息了!");  

// 成功消息提示，默认背景为浅绿色 
toastr.success("你有新消息了!");  

// 警告消息提示，默认背景为橘黄色 
toastr.warning("你有新消息了!");  

// 错误消息提示，默认背景为浅红色 
toastr.error("你有新消息了!");  

// 带标题的消息框
toastr.success("你有新消息了!","消息提示");  

// 另一种调用方法
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
options = {
    closeButton: false,  // 是否显示关闭按钮
    debug: false,        // 是否为调试
    progressBar: false,  // 是否显示进度条
    positionClass: 'toast-top-left'  // 消息框在页面显示的位置
    /*
    toast-top-left
    toast-top-right 
    toast-top-center 
    toast-top-full-width
    toast-botton-right  
    toast-bottom-left
    toast-bottom-center
    toast-bottom-full-width
    */
    onclick: null,           // 点击消息框自定义事件
    showDuration: '300',     // 显示动作时间
    hideDuration: '1000',    // 隐藏动作时间
    timeOut: '2000',         // 自动关闭超时时间
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
}
```