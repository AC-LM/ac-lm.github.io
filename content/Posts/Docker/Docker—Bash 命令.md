---
title: Docker—Bash 命令
date: 2021-08-16
author: LM
tags: ["Docker"]
---

## 1.运行 docker

```bash
docker version # 查看docker版本
systemctl start docker # 运行docker
systemctl status docker # 查看docker状态
systemctl enable docker  # 自启动docker
```

## 2.查看容器

```bash
docker ps -a  # 查看容器，包括未运行
docker ps  # 查看容易，正在运行的
docker rm name # 删除
docker rm -f name # 强制删除
docker rm $(docker ps -aq) # 删除全部容器 
```

## 3.启动容器

```bash
docker run --name python3.9 --privileged=true -v /root/pythonScript:/pythonScript -it python /bin/bash
# name 名字，privileged 权限，-v 挂载目录，-it 以shell模式
# -p 宿主机:容器
docker rename gallant_swartz python3.9 # 重命名
docker start container
docker stop container
docker stop $(docker ps -q) # 停用全部运行中的容器
docker restart container
```

## 4.查看镜像

```bash
docker images
docker rmi image
```

## 5.执行命令

```bash
docker exec -it id /bin/bash # 进入容器
>>> exit # 容器内退出
docker exec id commend  # 执行命令
```

## 6.导出

```bash
docker export a9ad7f0cb1ad > $(pwd)/itestserver.tar
```

## 7.下载镜像

```bash
docker search ubuntu
docker pull ubuntu
```

## 8.查看网络

```bash
docker network ls
docker network inspect python3.9 # 查看容器网络配置
docker inspect -f {{".NetworkSettings.IPAddress"}} python3.9 # 查看容器IP
docker inspect -f='{{.Name}} {{.NetworkSettings.IPAddress}} {{.HostConfig.PortBindings}}' $(docker ps -aq) # 列出所有容器对应的名称，端口，及IP
```

## 9.复制文件

```bash
docker cp testtomcat：/usr/local/tomcat/webapps/test/js/test.js /opt  # 从容器里面拷文件到宿主机
docker cp /opt/test.js testtomcat：/usr/local/tomcat/webapps/test/js  # 从宿主机拷文件到容器里面
```

