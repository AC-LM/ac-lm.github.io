---
title: 随记(28)—使用Gitee+PicGo搭建图床
date: 2021-07-25
author: LM
tags: ["随记"]
---

## 1.PicGo

软件：[ Molunerfinn/PicGo · GitHub ](https://github.com/Molunerfinn/PicGo/releases)

插件：`gitee-uploader`

PS：注意插件的安装需要环境由`node.js`，[ nodejs.org ](https://nodejs.org/zh-cn/)

## 2.Gitee

1.新建一个公有仓库

2.配置私人令牌(token)，在`设置`中找到`安全设置`，点击`私人令牌`

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210724115730.png)

3.点击`新建`，仅选择下图两项，提交并验证密码后会展示`token`，记录下来，后面操作会使用到。（注意：这个令牌只会明文显示一次）

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210724115851.png)

## 3.PicGO配置

1.选择`图床设置`，选择`gitee`

2.进行配置

- **repo**：用户名/仓库名称（仓库地址后面那一段）
- **branch**：分支，填写master
- **token**：填入前面获取的`私人令牌`
- **path**：路径，一般填写img
- **customPath**：提交消息，可不填
- **customURL**：自定义地址，可不填

3.`上传区`选择`gitee`便可上传图片