---
title: Docker(4)—备份和恢复
date: 2021-08-26
author: LM
---

## 1.docker 容器的导出备份

```shell
docker export -o 容器导出文件(格式为tar压缩文件) 容器ID或容器名称
docker export -o $(pwd)/newtomcat.tar mytomcat
-----------------------------------------------------
docker export 容器ID或容器名称 > 容器导出文件(格式为tar压缩文件) 
docker export mytomcat > $(pwd)/newtomcat.tar 
+++++++++++++++++++++++++++++++++++++++++++++++++++++
注释：
$(pwd)是docker支持的获取当前目录路径的方法，与linux的pwd类似
$(pwd)/newtomcat.tar 表示在当前目录下生成一个newtomcat.tar压缩文件
```

## 2.docker 容器的导入恢复

```shell
docker import 容器导出文件(格式为tar压缩文件) 新镜像名称[:版本号]
docker import $(pwd)/newtomcat.tar newtomcat:v1.0
------------------------------------------------------
docker import /URL 新镜像名称[:版本号]
docker import http://example.com/exampleimage.tgz example/imagerepo
```

## 3.docker 镜像的导出备份

```shell
docker save -o 镜像导出文件(格式为tar压缩文件) 镜像ID或镜像名称[:版本号]
docker save -o $(pwd)/mytomcat.tar newtomcat:v1.0
----------------------------------------------------------------------
docker save 镜像ID或镜像名称[:版本号] > 镜像导出文件(格式为tar压缩文件)
docker save newtomcat:v1.0 > $(pwd)/mytomcat.tar 
```

## 4.docker 镜像的导入恢复

```shell
docker load -i 镜像导出文件(格式为tar压缩文件)
docker load -i $(pwd)/mytomcat.tar
--------------------------------------------------------------------
docker load < 镜像导出文件(格式为tar压缩文件)
docker load < $(pwd)/mytomcat.tar
```

## 5.提交新镜像

```shell
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
docker commit -a "runoob.com" -m "my apache" a404c6c174a2  mymysql:v1 
```

