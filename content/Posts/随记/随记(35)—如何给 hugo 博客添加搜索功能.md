---
title: 随记(35)—如何给hugo博客添加搜索功能
date: 2021-09-16
author: LM
tags: ["随记"]
---

> 参考原文：[给Hugo站点添加搜索功能 - Go语言中文网](https://studygolang.com/articles/27141?fr=sidebar)

## 实现思路

- 利用 hugo 生成的 index.xml 文件进行内容搜索。路径 public > index.xml。文件包含博客所有文章的标题，链接和概要。
- JavaScript 实现如下

```javascript
    if(window.location.pathname === '/404.html'){
	   query = window.location.search.substr(1)
	   if(query){
	       searchKey = query.replace('query=', '')
	       // $('#404').text(decodeURI(searchKey));
	       $('#404').text('搜索结果')
	       $.get('/index.xml', function(data){
	           items = data.getElementsByTagName("item");
	           var i = 0;
	           var node = ''
	           while ( i < items.length) {
	               txt = items[i].getElementsByTagName("title")[0].innerHTML + items[i].getElementsByTagName("description")[0].innerHTML;
	               if((txt.indexOf(searchKey)) > -1){
	                  var title = items[i].getElementsByTagName("title")[0].innerHTML;
	                  console.log(items[i].getElementsByTagName("description")[0].innerHTML);
	                  var link = items[i].getElementsByTagName("link")[0].innerHTML;
	                  node = node + '<p><a href="' + link + '">' + title + '</a></p>'
	               };
	               i++;
	           }
	           div = document.createElement("div")
	           div.innerHTML = node;
	           $('#404content').append(div)
	       });
	   }
    }
```

