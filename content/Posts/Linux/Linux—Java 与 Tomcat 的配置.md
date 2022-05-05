---
title: Linux—Java 与 Tomcat 的配置
date: 2020-10-22
author: LM
tags: ["Linux"]
---

## 1.Java 配置

```bash
# 查看内核
arch
uname -a
```

[ JDK 官网下载 ](https://www.oracle.com/java/technologies/javase-downloads.html)  注意跟随内核版本，ARM下ARM，x86下x86，下载源码

```bash
# 删除自带的openjava
rpm -qa | grep java
yum -y remove openjava
# 配置环境变量
vim /etc/profile #编辑vi
# 添加以下内容
# This is Java:
JAVA_HOME=/home/ams/jdk
PATH=$PATH:${JAVA_HOME}/bin
export JAVA_HOME PATH
source /etc/profile #启用环境 配置后启动环境，若配置环境后无法使用Java，需运行此命令
Java -version
```

## 2.Tomcat 配置

[ Tomcat 官网下载 ](https://tomcat.apache.org/)  注意跟随内核版本，下载源码

```bash
# 环境变量
# 建议定义在单个tomcat的启动和关闭程序，避免影响
# 打开startup.sh和shutdown.sh，添加以下内容
export TOMCAT_HOME=/home/ams/tomcat
export CATALINA_HOME=/home/ams/tomcat
export PATH=$PATH:/home/ams/tomcat/bin
#--------------------------------------
/bin/bash startup.sh #运行tomcat
ps -ef | grep tomcat #是否安装tomcat
root       3905 13.0  2.3 5052592 124264 pts/0  Sl   10:59   0:03 /home/ams/jdk/bin/java -Djava.util.logging.config.file=/home/ams/tomcat/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djdk.tls.ephemeralDHKeySize=2048 -Djava.protocol.handler.pkgs=org.apache.catalina.webresources -Dorg.apache.catalina.security.SecurityListener.UMASK=0027 -Dignore.endorsed.dirs= -classpath /home/ams/tomcat/bin/bootstrap.jar:/home/ams/tomcat/bin/tomcat-juli.jar -Dcatalina.base=/home/ams/tomcat -Dcatalina.home=/home/ams/tomcat -Djava.io.tmpdir=/home/ams/tomcat/temp org.apache.catalina.startup.Bootstrap start
root       4003  0.0  0.0 112824   976 pts/0    S+   11:00   0:00 grep --color=auto tomcat
#----------------------------------------
浏览器打开 IP:8080
将Html文件放置在Tomcat目录下webapps文件夹内，访问相应地址如192.168.204.129:8080/Apage/Menu.html
```

