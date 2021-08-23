---
title: Docker(3)——设置国内镜像源
date: 2021-08-18
author: LM
---

创建或修改 /etc/docker/daemon.json 文件

```json
{
     "registry-mirrors": ["https//hub-mirror.c.163.com"]
}
```

Docker中国区官方镜像
https://registry.docker-cn.com

网易
http://hub-mirror.c.163.com

中国科技大学
https://docker.mirrors.ustc.edu.cn
