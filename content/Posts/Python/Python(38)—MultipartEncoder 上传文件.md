---
title: Python(38)——MultipartEncoder 上传文件
date: 2021-11-19
author: LM
---

> [ 上传文件模块 MultipartEncoder @山猪打不过家猪 ](https://www.jianshu.com/p/9738e53a7db3)

## 1.上传文件模块 MultipartEncoder

MultipartEncoder 是使用于上传文件的一个模块，其包含在模块 requests_toolbelt 中

```python
pip install requests_toolbelt
```

官方提供了上传文件时 MultipartEncoder 的示例用法

```python
from requests_toolbelt import MultipartEncoder

encoder = MultipartEncoder({
            'field': ('file_name', b'{"a": "b"}', 'application/json',
                      {'X-My-Header': 'my-value'})
        })
# field：服务端约定的上传文件字段名。一般用到的是file，需要和服务端沟通获取
# file_name: 文件名。一般可以任意写，服务端大多是拿到文件后自己再次命名
# b'{"a":"b"}'：文件内容，以二进制代码存在。例：open('/your/file/path', 'rb')
# 'application/json'：文件的MimeType。不同文件类型需要对应不同的 MimeType
# {'X-My-Header': 'my-value'}：其他内容，可不传。
payload = {
    'file': ('upload.pdf', open('sync_test.pdf', 'rb'), 'application/pdf')
}
m = MultipartEncoder(payload)
```

参照官方给予的示例代码，我们可以仿照仿照出下列代码

```python
import requests
from requests_toolbelt import MultipartEncoder


upload_url = 'https://your/upload/url'
payload = {
    'file': ('upload.pdf', open('sync_test.pdf', 'rb'), 'application/pdf')
}
m = MultipartEncoder(payload)
headers = {
    "Content-Type": m.content_type,
    "other-keys": "other-values"
}
r = requests.post(upload_url, headers=headers, data=m)
print(r.json())
```

## 2.构造 WebKitFormBoundary 格式参数

### a.函数

```python
def WebKit_format(data, boundary="----WebKitFormBoundary*********ABC", headers=None):
    # 从headers中提取boundary信息
    if headers is None:
        headers = {}
    if "content-type" in headers:
        fd_val = str(headers["content-type"])
        if "boundary" in fd_val:
            fd_val = fd_val.split(";")[1].strip()
            boundary = fd_val.split("=")[1].strip()
        else:
            raise Exception("multipart/form-data头信息错误，请检查content-type key是否包含boundary")
    # form-data格式定式
    jion_str = '--{}\r\nContent-Disposition: form-data; name="{}"\r\n\r\n{}\r\n'
    end_str = "--{}--".format(boundary)
    args_str = ""
    if not isinstance(data, dict):
        raise Exception("multipart/form-data参数错误，data参数应为dict类型")
    for key, value in data.items():
        args_str = args_str + jion_str.format(boundary, key, value)
    args_str = args_str + end_str.format(boundary)
    args_str = args_str.replace("\'", "\"")
    return args_str
```

### b.调用

```python
def test001_auth_login():
    headers = {'Accept': "application/json",
               'Content-Type': "multipart/form-data; boundary=----WebKitFormBoundary*********ABC",
               'Accept-Encoding': "gzip, deflate, br", 'Connection': "keep-alive"}
    url = "https://www.baidu.com/login/"
    bodyData = {
        "username": 1234567890,
        "password": "a123456",
        "type": "account",
        "bindType": "null",
        "openId": "null"
    }
    boundary_body = WebKit_format(data=bodyData, headers=headers)
    print(boundary_body)
    response = requests.post(url, data=boundary_body, headers=headers)
    access_token = regSearchString(response.text, '"access_token":"(.+?)",', 16, -2)
    print("正则--获取登陆的access_token:  " + access_token)
    print(response.text)
    time.sleep(1)
```

### c.输出

```python
boundary_body = WebKit_format(data=bodyData, headers=headers)

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="v"

2.0
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="req"

{"cno": "1213058673616305"}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="sig"

1
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="ts"

1
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="appid"

dp3wY4YtycajNEz23zZpb5Jl
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

