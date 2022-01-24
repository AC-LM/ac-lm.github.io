---
title: 随记(39)—yaml 的锚点与引用
date: 2022-01-22
author: LM
tags: ["随记"]
---

## 1.yaml 的锚点 & 与引用 *

### a.通过 << 合并内容

```yaml
user:
	host: 127.0.0.1
	db: 8
book:
	host: 127.0.0.1
	db: 9
```

使用锚点和引用配置后

```yaml
localhost: &localhost1
	host: 127.0.0.1
user:
	<<: *localhost1
	db: 8
book:
	<<: *localhost1
	db: 9
```

其中，`&`表示将`localhost1`作为`localhost`的别名，`<<`表示将`localhost1`代表的`map`合并入当前`map`数据

### b.通过 * 引用数据

```yaml
localhost: 
	host: &host 127.0.0.1
user:
	host: *host
	db: 8	
book:
	host: *host
	db: 9
```

