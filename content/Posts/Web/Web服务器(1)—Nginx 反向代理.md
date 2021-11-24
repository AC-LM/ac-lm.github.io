---
title: Web服务器(1)——Nginx 反向代理
date: 2020-03-02
author: LM
---

## 1.什么是正向代理与反向代理

**正向代理隐藏了真实的请求客户端，服务端不知道真实的客户端是谁，客户端通过代理服务器来访问服务端，客户端所有的请求都通过代理服务器来发送**。某些科学上网工具就是典型的正向代理角色，通过在国外搭建一台代理服务器，让代理代替我去发送请求，然后代理服务器再把响应返回给我。

**反向代理隐藏了真实的服务端，客户不知道真正提供服务人的是谁，客户只需要访问反向代理服务器便可以获取到响应**。例如，当我们请求百度的时候，可能有成千上万台服务器准备为我们服务，但具体是哪一台就不清楚了。但实际上，我们不需要知道这个，只需要知道反向代理服务器 www.baidu.com 就可以了，反向代理服务器会帮我们把请求转发到真实的服务器那里去。

**两者的区别在于代理的对象不一样：  正向代理是为客户端代理，反向代理是为服务端代理。**

## 2.通过Nginx实现反向代理

Nginx是最为流行的反向代理服务器之一，而且能用来实现负载均衡。

什么是负载均衡？就是把项目部署在不同的服务器上，但是通过统一的域名进入，由Nginx对请求进行分发，最终减轻服务器的压力。此时，Nginx服务器仅作为分发服务器，而真正的内容可以放在其他的服务器上，这样来，还能起到一层安全隔壁的作用，Nginx作为隔离层。其次，Nginx还能解决跨域的问题。

## 3.Nginx的配置文件

![](https://gitee.com/LM-J/drawingbed/raw/master/img/28.png)

### 1.全局块

该部分配置主要影响Nginx全局，通常包括下面几个部分：

- 配置运行Nginx服务器用户（组）
- worker process数
- Nginx进程PID存放路径
- 错误日志的存放路径
- 配置文件的引入

### 2.events块

该部分配置主要影响Nginx服务器与用户的网络连接，主要包括：

- 设置网络连接的序列化
- 是否允许同时接收多个网络连接
- 事件驱动模型的选择
- 最大连接数的配置

### 3.http块

这部分是负责网页相关的配置

- 定义MIMI-Type
- 自定义服务日志
- 允许sendfile方式传输文件
- 连接超时时间
- 单连接请求数上限

### 4.server块

这部分是负责服务器相关的配置

- 配置网络监听
- 基于名称的虚拟主机配置
- 基于IP的虚拟主机配置

### 5.location块

本地文件配置

-  请求根目录配置
-  更改location的URI
-  网站默认首页配置

## 4. 代码解析

### 1. 全局块----配置运行Nginx服务器用户（组）

```nginx
user user [group];
#user：指定可以运行Nginx服务器的用户
#group：可选项，可以运行Nginx服务器的用户组
user nobody nobody; #如果user指令不配置或者配置为nobody nobody，则默认所有用户都可以启动Nginx进程
-------------------------------------------------------------------------------
worker_processes number | auto;
#number：Nginx进程最多可以产生的worker process数
#auto：Nginx进程将自动检测
worker_processes 3; #在后台查看进程//ps -aux | grep nginx//能发现开启了3个worker process进程
-------------------------------------------------------------------------------
error_log file | stderr;
#file：日志输出到某个文件file
#stderr：日志输出到标准错误输出
error_log logs/error.log; #将日志输出到logs/error.log
--------------------------------------------------------------------------------
pid file;
#file：指定存放路径和文件名称
#Nginx进程是作为系统守护进程在运行，需要在某文件中保存当前运行程序的主进程号,如果不指定默认置于路径logs/nginx.pid
----更多配置---------------------------------------------------------------------
include file;
#该指令主要用于将其他的Nginx配置或者第三方模块的配置引用到当前的主配置文件中
accept_mutex on | off;
#该指令默认为on状态，表示会对多个Nginx进程接收连接进行序列化，防止多个进程对连接的争抢
multi_accept on | off;
#该指令默认为off状态，意指每个worker process 一次只能接收一个新到达的网络连接。若想让每个Nginx的worker process都有能力同时接收多个网络连接，则需要开启此配置

```

### 2.Events块----事件配置

```nginx
use model;
#事件驱动模型的选择，可选择项包括：select、poll、kqueue、epoll、rtsig
----------------------------------------------------------------------------------
worker_connections number;
#最大连接数的配置，number默认值为512，表示允许每一个worker process可以同时开启的最大连接数
----------------------------------------------------------------------------------
```

### 3.Http全局块

```nginx
include mime.types;default_type mime-type;
#定义MIME-Type网络资源的媒体类型，也即前端请求的资源类型
#mime.types文件内容，是一个types结构，里面包含了各种浏览器能够识别的MIME类型以及对应类型的文件后缀名字
----------------------------------------------------------------------------------------
access_log path [format];
#path：自定义服务日志的路径 + 名称
#format：可选项，自定义服务日志的字符串格式。其也可以使用 log_format 定义的格式
----------------------------------------------------------------------------------------
sendfile on | off;sendfile_max_chunk size;
#前者用于开启或关闭使用sendfile()传输文件，默认off
#后者指令若size>0，则Nginx进程的每个worker process每次调用sendfile()传输的数据了最大不能超出此值；若size=0则表示不限制。默认值为0
---------------------------------------------------------------------------------------
keepalive_timeout timeout [header_timeout];
#连接超时时间配置
#timeout 表示server端对连接的保持时间，默认75秒
#header_timeout 为可选项，表示在应答报文头部的 Keep-Alive 域设置超时时间："Keep-Alive : timeout = header_timeout"
-----更多配置---------------------------------------------------------------------------
keepalive_requests number;
#单连接请求数上限，用于限制用户通过某一个连接向Nginx服务器发起请求的次数
```

### 4.Server全局块

```nginx
listen IP[:PORT];
listen PORT;
#配置监听的IP地址 或 配置监听的端口
listen 192.168.31.177:8080;   # 监听具体IP和具体端口上的连接
listen 192.168.31.177;   # 监听IP上所有端口上的连接
listen 8080;     # 监听具体端口上的所有IP的连接
------------------------------------------------------------------------------
server_name name1 name2 ...
#基于名称和IP的虚拟主机配置，name可以有多个并列名称，而且此处的name支持正则表达式书写
server_name ~^www\d+\.myserver\.com$
#此时表示该虚拟主机可以接收类似域名 www1.myserver.com 等的请求而拒绝 www.myserver.com 的域名请求，所以说用正则表达式可以实现更精准的控制
server_name 192.168.1.245;
```

### 5.Location块配置

```nginx
location [ = | ~ | ~* | ^~ ] uri {...};
#这里的uri分为标准uri和正则uri
#"="：用于标准uri前，要求请求字符串与uri严格匹配，一旦匹配成功则停止
#"~"：用于正则uri前，并且区分大小写
#"~*"：用于正则uri前，但不区分大小写
#"^~"：用于标准uri前，要求Nginx找到标识uri和请求字符串匹配度最高的location后，立即使用此location处理请求，而不再使用location块中的正则uri和请求字符串做匹配
location = /404.html{...};
------location内部内容-----------------------------------------------------------------------------
root path;
#path：Nginx接收到请求以后查找资源的根目录路径
#可以通过alias指令来更改location接收到的URI请求路径————alias path; # path为修改后的根路径
-------------------------------------------------------------------------------------------------
index file ......;
#设置网站的默认首页
#file:可以包含多个用空格隔开的文件名，首先找到哪个页面，就使用哪个页面响应请求
```

## 5.Nginx配置SSL及HTTP跳转到HTTPS

```nginx
# Nginx配置SSL并把Http跳转到Https，需修改Nginx.conf配置文件如下
server {

  listen 80;
  server_name www.joyitsai.com;
  return 301 https://www.joyitsai.com$request_uri;

  # 把http重定向到https使用了nginx的重定向命令，之前老版本的nginx可能使用了以下类似的格式：
  # rewrite ^/(.*)$ http://www.joyitsai.com/$1 permanent;
  # 或者：
  # rewrite ^ http://www.joyitsai.com$request_uri? permanent;
  # 现在nginx新版本已经换了种写法，上面这些已经不再推荐。现在网上可能还有很多文章写的是第一种。
  # 新的写法比较推荐方式是：return 301 https://www.joyitsai.com$request_uri;
}

server {

  listen 443;
  server_name www.joyitsai.com;
  root /data/release/weapp/uploadFiles;

  # 开启ssl功能
  ssl on;

  # 配置ssl证书，直接用.pem和.key文件的绝对路径
  ssl_certificate/data/release/nginx/1535530361992.pem;
  ssl_certificate_key/data/release/nginx/1535530361992.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers ECDHE - RSA - AES128 - GCM - SHA256: ECDHE: ECDH: AES: HIGH: !NULL: !aNULL: !MD5: !ADH: !RC4;
  ssl_prefer_server_ciphers on;

  location / {

     proxy_pass http://app_weapp;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_cache_bypass $http_upgrade;

  }

  location /images/ {
    autoindex on;
  }

  # 配置uri， ~用于正则uri前，其中.(png|jpg)为正则表达式，如果后缀是.png或.jpg的url请求，则匹配成功
  # root用于配置接收到请求以后查找资源的根目录路径

  location ~ \.(png|jpg) {
     root /data/release/weapp/uploadFiles;
  }

  error_page 404 /404.html;

  location = /40x.html {
  }

  error_page 500 502 503 504 /50x.html;

  location = /50x.html {
  }
}
```

