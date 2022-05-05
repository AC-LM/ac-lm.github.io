---
title: Linux—npm 包管理工具
date: 2020-11-24
author: LM
tags: ["Linux"]
---

## 1.npm

npm是一款包管理工具，允许用户从npm服务器下载别人编写的第三方包或命令行程序到本地使用。

由于npm是随Node.js一起安装的，所以我们安装Node.js即可安装npm

```bash
wget https://cdn.npm.taobao.org/dist/node/latest-v15.x/node-v15.9.0-linux-x64.tar.gz #下载源码
tar -zxvf node-v15.9.0-linux-x64.tar.gz #解压文件
vim /etc/profile #编辑环境变量
####
export PATH=$PATH:/opt/node-v15.9.0/bin
####
source /etc/profile #启用环境 配置后启动环境，若配置环境后无法使用，需运行此命令
node -v
npm -v
```

## 2.npm配置

```bash
# 下载源配置
npm config set registry https://registry.npm.taobao.org
npm config get registry
# 查看当前目录已安装插件
npm list
# 安装cnpm，淘宝团队做的国内镜像npm
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
