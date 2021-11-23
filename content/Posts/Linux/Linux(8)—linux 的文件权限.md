---
title: Linux(8)——linux 的文件权限
date: 2020-11-20
author: LM
---

**示例文件**

```shell
drwxr-x---  2 root root       37 Apr 18 10:50 data
-rw-r--r--  1 root root    68549 Sep 26  2018 fields.yml
-rwxr-xr-x  1 root root 33903123 Sep 26  2018 filebeat
-rwxr-xr-x  1 root root     1011 Mar 27 10:13 filebeat-docker.yml
-rw-r--r--  1 root root    66260 Sep 26  2018 filebeat.reference.yml
-rw-------  1 root root     7231 Sep 26  2018 filebeat.yml
drwxr-xr-x  4 root root       22 Sep 26  2018 kibana
-rw-r--r--  1 root root    13675 Sep 26  2018 LICENSE.txt
drwxr-xr-x 18 root root     4096 Sep 26  2018 module
drwxr-xr-x  2 root root     4096 Sep 26  2018 modules.d
-rw-r--r--  1 root root   148778 Sep 26  2018 NOTICE.txt
-rw-r--r--  1 root root      802 Sep 26  2018 README.md
```

## 1.文件权限drwxr-x---

drwxr-x--- 该权限分为4个部分d、rwx、r-x、---。

- **d**：表示文件类型
- **rwx**：表示文件所有者的对该文件所拥有的权限
- **r-x**：表示文件所属组对该文件所拥有的权限
- **---**：表示其他用户对该文件所拥有的权限

## 2.数字表示权限

读(read)，写(write)，执行r(recute)简写即为(r,w,x),亦可用数字来(4,2,1)表示

![](https://gitee.com/LM-J/drawingbed/raw/master/img/852.png)

- 如果某文件权限为7则代表可读(4)、可写(2)、可执行(1)，即(4+2+1=7).
- 若权限为6(4+2)则代表可读(4)、可写(2)。
- 若权限为5(4+1)代表可读(4)和可执行(1).
- 若权限为3(2+1)代表可写(2)和可执行(1)。

## 3.文件的详细信息

![](https://gitee.com/LM-J/drawingbed/raw/master/img/853.png)

第一个减号“-”代表的是文件类型：-：普通文件，d:目录文件，l:链接文件，b:设备文件，c:字符设备文件，p:管道文件

第二个符号开始表示文件的权限，rw-r-r- 也就是分别表示所有者(属主)有读写权限，所有组(属组)有读权限，其余人也仅有读权限。

## 4.授权

```shell
chmod -R 755
# 该命令表示文件所有者有读写执行权限（4+2+1）、文件所属组有读执行权限（4+1）、其他人有读执行权限（4+1）
# chmod 参数----------------------------------------------------
-c : 若该文件权限确实已经更改，才显示其更改动作
-f : 若该文件权限无法被更改也不要显示错误讯息
-v : 显示权限变更的详细资料
-R : 对目前目录下的所有文件与子目录进行相同的权限变更
--help : 显示辅助说明
--version : 显示版本 
```