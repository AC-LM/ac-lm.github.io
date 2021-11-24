---
title: Web开发(6)—常用小知识
date: 2021-06-03
author: LM
---

## 1.屏蔽链接

```html
href="javascript:void(0);"
<script>window.alert("sometext")</script>
```

## 2.min文件

min，Minimized的缩写，是压缩后的js或css文件。里面的功能与没有min的文件是一样的。

js或css文件一般都是从服务器上下载到本地浏览器上解释执行的，如果js文件过大，这样必然会导致网页加载速度变慢。所以，有了压缩js文件的做法。

实际压缩原理很简单，就是把原来js文件中的空格，回车符，注释全部清除。因此这种js文件通常是不可读的，因为压缩后，文件是一行写到尾。

## 3.li标签间的间隔删除

li标签间的间隔是由于：行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符，这些空白也会被应用样式，占据空间，所以会有间隔。可以将闭合标签写到开头

```html
<li>BAT
</li><li>BAT</li>
```

也可以通过设置 li 标签的 font-size 为 0，解决该问题。

## 4.CSS样式覆盖

- 规则一：由于继承而发生样式冲突时，最近祖先/父元素获胜（最近原则）
- 规则二：继承的样式和直接指定的样式冲突时，直接指定的样式获胜（最直接原则）
- 规则三：直接指定的样式发生冲突时，样式权值高者获胜。内联样式的权值>>ID选择器>>类选择器>>标签选择器
- 规则四：样式权值相同时，后者获胜。注意样式表的出现位置
- 规则五：!important的样式属性不被覆盖

## 5.页面跳转

```javascript
window.location.replace("网址");
window.location.href = "网址";
$(location).attr('href', ‘网址’);
$(window).attr('location',‘网址’);
$(location).prop('href',‘网址’)
```

## 6.js将html字符串转换成node节点

### innerHTML

```javascript
function createNode(txt) {
  const template = `<div class='child'>${txt}</div>`;
  let tempNode = document.createElement('div');
  tempNode.innerHTML = template;
  return tempNode.firstChild;
}

const container = document.getElementById('container');
container.appendChild(createNode('hello'));
```

### DOMParser

```javascript
function createDocument(txt) {
  const template = `<div class='child'>${txt}</div>`;
  let doc = new DOMParser().parseFromString(template, 'text/html');
  let div = doc.querySelector('.child');
  return div;
}
  
const container = document.getElementById('container');
container.appendChild(createDocument('hello'));
```

### DocumentFragment

```javascript
function createDocumentFragment(txt) {
  const template = `<div class='child'>${txt}</div>`;
  let frag = document.createRange().createContextualFragment(template);
  return frag;
}
 
const container = document.getElementById('container');
container.appendChild(createDocumentFragment('hello'));
```

## 7.获取当前页面Url

```javascript
var url;
 
url = window.location.href; /* 获取完整URL */
console.log(url); /* http://127.0.0.1:8020/Test/index.html#test?name=test */
 
url = window.location.pathname; /* 获取文件路径（文件地址） */
console.log(url); /* /Test/index.html */
 
url = window.location.protocol; /* 获取协议 */
console.log(url); /* http */
 
url = window.location.host; /* 获取主机地址和端口号 */
console.log(url); /* http://127.0.0.1:8020/ */
 
url = window.location.hostname; /* 获取主机地址 */
console.log(url); /* http://127.0.0.1/ */
 
url = window.location.port; /* 获取端口号 */
console.log(url); /* 8020 */
 
url = window.location.hash; /* 获取锚点（“#”后面的分段） */
console.log(url); /* #test?name=test */
 
url = window.location.search; /* 获取属性（“?”后面的分段） */
console.log(url);
 
/* 获取请求参数的值 */
function GetQueryString(name) {
 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
 var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
 var context = "";
 if (r != null)
   context = r[2];
 reg = null;
 r = null;
 return context == null || context == "" || context == "undefined" ? "Null" : context;
}

```

## 8.JQuery函数attr()和prop()的区别

attr()，attribute和prop()，property，都表示"属性"的意思，但是两者操作的对象不同。

- attr()函数操作的是文档节点的属性，因此设置的属性值只能是字符串类型，如果不是字符串类型，也会调用其toString()方法，将其转为字符串类型。
- prop()函数操作的是JS对象的属性，因此设置的属性值可以为包括数组和对象在内的任意类型。

在jQuery 1.6之后，对于表单元素的checked、selected、disabled等属性，使用attr()获取这些属性的返回值为String类型，如果被选中(或禁用)就返回checked、selected或disabled，否则(即元素节点没有该属性)返回undefined。而使用prop()则返回bool值的true与false以表示该属性实时状态。

## 9.js判断一个数组是否包含一个指定的值

### array.indexOf(value)

此方法判断数组中是否存在某个值，如果存在返回数组元素的下标，否则返回-1

```javascript
let arr = ['something', 'anything', 'nothing', 'anything'];
let index = arr.indexOf('nothing');
console.log(index) //结果是2
```

### array.includes(value)  

此方法判断数组中是否存在某个值，如果存在返回 true，否则返回false。

```javascript
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
console.log(redFruits.includes(fruit));
```

### array.find(callback())   

返回数组中满足条件的第一个元素的值，如果没有，返回undefined

```javascript
// ---------- 元素是普通字面值 ----------
let numbers = [12, 5, 8, 130, 44];
let result = numbers.find(item => {
    return item > 8;
});console.log(result)
# 结果： 12
// ---------- 元素是对象 ----------
let items = [
    {id: 1, name: 'something'},
    {id: 2, name: 'anything'},
    {id: 3, name: 'nothing'},
    {id: 4, name: 'anything'}
];
let item = items.find(item => {
    return item.id == 3;
});console.log(item) 
# 结果： Object { id: 3, name: "nothing" }
```

## 10.js强制类型转换

将其他数据类型转换成String类型，注意Null与Undefined无toString()方法

```javascript
value.toString()
String(value)
```

将其他的数据类型转换为Number类型，注意对非数字字符类型会转换为NaN，Null会转换为0

```javascript
Number(value)
```

将其他的数据类型转换为Boolean类型

```javascript
Boolean(value)
```

## 11.js实现ctrl+v粘贴图片

ctrl+v粘贴图片都是监听paste事件实现的，复制的数据都存在clipboardData下面。

打印clipboardData.items，可以发现是一个DataTransferItem，可以使用getAsFile()的方法获取文件

```javascript
document.addEventListener('paste', function (event) {
    console.log(event);
    var isChrome = false;
    if (event.clipboardData || event.originalEvent) {
        //某些chrome版本使用的是event.originalEvent
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if(clipboardData.items){
            // for chrome
            var  items = clipboardData.items,
            len = items.length,
            blob = null;
            isChrome = true;
            for (var i = 0; i < len; i++) {
               console.log(items[i]);
               if (items[i].type.indexOf("image") !== -1) {
                  //getAsFile()
                  blob = items[i].getAsFile();
               }
           }
        }
    }
})
```

此时就可以获取到blob对象了，这时候可以选择显示在页面上，也可以选择发送给后台

使用blob对象显示

```javascript
var blobUrl=URL.createObjectURL(blob);
document.getElementById("imgNode").src=blobUrl;
```

使用base64显示

```javascript
reader.onload = function (event) {
     // event.target.result 即为图片的Base64编码字符串
     var base64_str = event.target.result;
     document.getElementById("imgNode").src=base64_str;
}
reader.readAsDataURL(blob);
```

生成formData上传

```javascript
var fd = new FormData();
fd.append("the_file", blob, 'image.png');
```

## 12.Web应用性能分析工具HAR（HTTP Archive format）

HAR文件，是用来记录浏览器加载网页时所消耗的时间的工具。它可以记录每一个HTTP请求发出直到收到完整的HTTP响应中间所耗费的时间，可以迅速帮助我们知道是哪些HTTP请求没有得到及时的回复，从而进行更一步的排查。同时可以使用Httprunner生成业务脚本
