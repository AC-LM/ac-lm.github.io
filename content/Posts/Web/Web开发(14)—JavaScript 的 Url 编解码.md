---
title: Web开发(14)—JavaScript 的 Url 编解码
date: 2021-09-16
author: LM
---

##  escape()

escape() 不能直接用于URL编码，它的作用是返回一个字符的 Unicode 编码值。比如"春节"的返回结果是%u6625%u8282，escape() 仅不对`+`进行编码，其主要用于汉字编码。

```javascript
console.log(escape("春节+国庆"))
// %u6625%u8282+%u56FD%u5E86
console.log(escape("春节=+=国庆"))
// %u6625%u8282%3D+%3D%u56FD%u5E86
console.log(unescape('%u6625%u8282%3D+%3D%u56FD%u5E86'))
// 春节=+=国庆
```

## encodeURI()

encodeURI() 是用来对 URL 编码的函数。函数会编码整个 URL 地址，但对特殊含义的符号 `; / ? : @ & = + $ , #` 不进行编码。

```javascript
console.log(encodeURI('http://baidu.com?hello=您好&word=文档'))
// http://baidu.com?hello=%E6%82%A8%E5%A5%BD&word=%E6%96%87%E6%A1%A3
console.log(decodeURI('http://baidu.com?hello=%E6%82%A8%E5%A5%BD&word=%E6%96%87%E6%A1%A3'))
// http://baidu.com?hello=您好&word=文档
```

## encodeURIComponent()

encodeURIComponent() 能编码如`; / ? : @ & = + $ , #`这些特殊字符

```javascript
console.log(encodeURIComponent('http://baidu.com?hello=您好&word=文档'))
// http%3A%2F%2Fbaidu.com%3Fhello%3D%E6%82%A8%E5%A5%BD%26word%3D%E6%96%87%E6%A1%A3
console.log(decodeURIComponent('http%3A%2F%2Fbaidu.com%3Fhello%3D%E6%82%A8%E5%A5%BD%26word%3D%E6%96%87%E6%A1%A3'))
// http://baidu.com?hello=您好&word=文档
```

