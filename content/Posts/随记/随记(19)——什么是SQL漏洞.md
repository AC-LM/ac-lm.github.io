---
title: 随记(19)——什么是SQL漏洞
date: 2020-12-11
author: LM
---

要了解sql漏洞，首先要搞清楚sql语句。sql 全称 Structured Query Language(结构化查询语言)，是一种应用于数据库查询的编程语言。

```sql
SELECT * FROM admin WHERE user = "test" AND pass = "123456";
```

这一句就是从admin表中查找 user为test 并且 pass为123456 的记录，并将满足要求的记录输出。但是如果我输入的密码是 " OR "1"="1 ，用户名是 test ，那么sql语句则变为

```sql
SELECT * FROM admin WHERE user = "test" AND pass = "" OR "1"="1";
```

很明显，WHERE后的表达式一定返回true，于是mysql会将每条记录都输出，而网站误以为这个用户名是正确的，然后让你以test的身份登录。如果网站还设有管理权限，那么你可以试试密码为 " OR "1"="1" AND writable = TRUE AND ""="，这样，sql查询语句就是

```sql
SELECT * FROM admin WHERE user = "test" AND pass = "" OR "1"="1" AND writable = TRUE AND ""="";
```

其中 user = "test" AND pass = "" OR "1"="1" 始终返回true，所以实际条件为 writable = TRUE AND ""=""，即writable = TRUE，于是mysql会将writable为true的记录输出。

还有一种是通过GET参数id来查询的

```sql
SELECT * FROM articles WHERE id = 1;
```

如果网站没有对id进行校验，那么不妨用 id=1 AND 1=1  // id=1 AND 1=2 // id=" 来测试，对应结果为正确，正确，错误，即该接口可以被注入

```sql
SELECT * FROM articles WHERE id = 1 AND 1=1;
```
