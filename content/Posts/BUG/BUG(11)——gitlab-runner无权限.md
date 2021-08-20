---
title: BUG(11)——gitlab-runner无权限
date: 2020-01-06
author: LM
---

## Resolution

手动将gitlab-runner服务设置为 root 用户

```python
ps aux|grep gitlab-runner  #查看当前runner用户

sudo gitlab-runner uninstall  #删除gitlab-runner

gitlab-runner install --working-directory /home/gitlab-runner --user root   #安装并设置--user(例如我想设置为root)

sudo service gitlab-runner restart  #重启gitlab-runner

ps aux|grep gitlab-runner #再次执行会发现--user的用户名已经更换成root了
```

