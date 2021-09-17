---
title: BUG(20)——Request模块Url编码问题
date: 2021-09-16
author: LM
---

## BUG描述

Python 中用户使用 Requests 库发送 Http 请求时，请求的所有参数都会被进行 Url 编码。此时容易出现由于 Url 编码后参数异常的情况，特别是**中文字符**，最终导致 Http 请求失败。

## Resolution

用户可以将参数提前进行编码传递，以避免 Requests 库对参数的编码

```python
payload1 = '{ABC}'
# String
data = payload1.encode('utf-8')
# b'{ABC}' 转换后的 UTF-8 编码
response = requests.request("POST", url, data=data)
```

