---
title: Linux—Docker 与防火墙
date: 2020-10-16
author: LM
tags: ["Linux", "Docker"]
---

## 1.docker操作

```bash
uname -r # 查看内核信息
yum list installed | grep docker # 查找docker是否安装
yum -y install docker  # 下载安装docker
systemctl start docker # 运行docker
systemctl status docker # 查看docker状态
systemctl enable docker  # 自启动docker
docker version # docker版本
docker ps -a # 查看docker安装的服务
docker start services # docker运行服务
docker rm -f docker_name # 强制删除
docker exec service_ip/docker_id ping www.baidu.com # 联网查看
docker exec -it docker_id /bin/bash # 进入容器 
docker rename new_name old_name # 重命名
docker images
docker rmi image
docker export docker_id > $(pwd)/backups.tar
exit # 退出
docker stop $(docker ps -q) # 停用全部运行中的容器
docker rm $(docker ps -aq) # 删除全部容器 
docker cp container：container_file backups_file # 复制文件
docker run --name python3.9 --privileged=true -v /root/pythonScript:/pythonScript -it python /bin/bash # 运行文件
docker exec id commend
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq) # 查看容器 IP
```

## 2.防火墙操作

```bash
cd /etc/firewalld/zones # 查看防火墙文件
firewall-cmd --zone=public --add-port=8080/tcp --permanent # 开放8080/tcp端口 （--permanent永久生效，没有此参数重启后失效）
firewall-cmd --zone=public --remove-port=8080/tcp --permanent # 关闭8080/tcp端口
firewall-cmd --zone=public --query-port=80/tcp # 查看端口状态
firewall-cmd --reload # 重启防火墙
firewall-cmd --completely-reload
firewall-cmd --list-all # 列出防火墙所以规则
firewall-cmd --list-ports # 列出防火墙开放的端口
firewall-cmd --version # 查看版本： 
firewall-cmd --help
firewall-cmd --state
firewall-cmd --panic-on # 拒绝所有包：
firewall-cmd --panic-off # 取消拒绝状态： 
firewall-cmd --query-panic # 查看是否拒绝： 
firewall-cmd --zone=docs --add-port=40000-45000/tcp --permanent # 批量开放端口，打开从40000到45000之间的所有端口
firewall-cmd --zone=docs --remove-port=40000-45000/tcp --permanent # 批量关闭端口，关闭从40000到45000之间的所有端口
firewall-cmd --zone=work --add-service=smtp  # 添加服务
firewall-cmd --zone=work --query-service=smtp  # 查看服务
firewall-cmd --zone=work --remove-service=smtp  # 删除服务
#-------------------------------------------------------
systemctl stop firewalld # 关闭防火墙
systemctl start firewalld # 开启防火墙
systemctl status firewalld # 防火墙状态
systemctl stop firewalld # 停止
systemctl disable firewalld # 开机禁用
systemctl enable firewalld # 开机启动
yum install firewalld # 安装
```
