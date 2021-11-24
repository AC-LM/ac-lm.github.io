---
title: Web服务器(2)—Apache & Tomcat
date: 2020-03-03
author: LM
---

## 1.Apache

1. C语言实现的，专门用来提供HTTP服务的程序
2. 特性：简单、速度快、性能稳定、可配置（代理），主要用于解析静态文本，并发性能高，侧重于HTTP服务
3. 支持静态页（HTML），不支持动态请求如：CGI、Servlet/JSP、PHP、ASP等
4. 具有很强的可扩展性，可以通过插件支持PHP，还可以单向Apache连接Tomcat实现连通。Apache是世界使用排名第一的Web服务器

## 2.Tomcat

1. 是Java开发的一个符合JavaEE的Servlet规范的JSP服务器（Servlet容器），是 Apache 的扩展。免费的Java应用服务器
2. 主要用于解析JSP/Servlet，侧重于Servlet引擎
3. 支持静态页，但效率没有Apache高；支持Servlet、JSP请求
4. Tomcat本身也内置了一个HTTP服务器用于支持静态内容，可以通过Tomcat的配置管理工具实现与Apache整合

## 3.Apache + Tomcat

如果请求是静态网页则由Apache处理，并将结果返回；如果是动态请求，Apache会将解析工作转发给Tomcat处理，Tomcat处理后将结果通过Apache返回。这样可以达到分工合作，提高系统的性能的效果。
