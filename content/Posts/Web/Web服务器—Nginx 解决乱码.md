---
title: Web服务器—Nginx 解决乱码
date: 2020-09-16
author: LM
tags: ["Web", "服务器"]
---

## 1.问题

当 Nginx 服务器运行时，有时用户访问中文内容会出现乱码

## 2.解决

此时需要修改 Nginx 的 server 配置内容，增加字段：`charset utf-8;`

```nginx
server {
    listen   80;
    server_name you.example.com;
    charset utf-8;
    
    location /examples {
        return 403;
    }

}
```