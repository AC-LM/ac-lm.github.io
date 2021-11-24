---
title: Web服务器(4)—Nginx解决乱码
date: 2020-09-16
author: LM
---

## 问题

当 Nginx 服务器运行时，有时用户访问中文内容会出现乱码

## 解决

此时需要修改 Nginx 的 server 配置内容，增加字段：`charset utf-8;`

```nginx
upstream you.example.com {
    server 127.0.0.1:8081;
}
 
server {
    listen   80;
    server_name you.example.com;
    charset utf-8;
    
    location /examples {
        return 403;
    }
    
    ......
}
```