---
title: Kali(2)——启动SSH服务
date: 2021-06-09
author: LM
---

由于 Kali 默认未启用 SSH 服务，需要手动开启

```
systemctl start ssh
systemctl status ssh
sudo systemctl enable ssh
```

如果需要允许 Root 登录，需要进一步修改

```
vim /etc/ssh/sshd_config
# 将PermitRootLogin 置为 yes
```

