---
title: Django(12)——404 文件
date: 2021-08-26
author: LM
---

## Django的404

Django 能自动的寻找 404 文件，在路径错误时自动跳转，需要注意的是，当 DEBUG = True 时，系统不会调用 404 文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404页面找不着了x</title>
</head>
<body>
<h1>Error:404,页面找不到了</h1>
<h2>{{ request_path }}</h2>
<hr>
<p>404页面名字不允许改变，必须为404.html，且必须放到/templates根目录下</p>
<hr>
<a>500,400页面也类似</a>
</body>
</html>
```

