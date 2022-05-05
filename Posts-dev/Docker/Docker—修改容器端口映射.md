---
title: Docker—修改容器端口映射
date: 2021-05-31
author: LM
tags: ["Linux"]
---

## 1.找到docker的配置文件

使用 `docker ps -a` 命令找到要修改容器的 CONTAINER ID

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205050954001.png)

运行 `docker inspect 【CONTAINER ID】 | grep Id` 命令，根据容器ID找到文件ID

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205050954517.png)

执行 `cd /var/lib/docker/containers` 命令进入 docker 容器文件夹，找到与 文件ID 相同的目录

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205050954626.png)

## 2.修改docker的配置文件

停止 docker 引擎服务，systemctl stop docker 或者 service docker stop

进入对应 文件ID 所在目录，修改 hostconfig.json 两个文件

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205050954685.png)

把 8080 映照到 80，重启服务 systemctl start docker 

【PS】或修改 vi config.v2.json，找到 ExposedPorts 和 Ports 对应项，还是仿照原先的内容添加自己所需要的端口映射 