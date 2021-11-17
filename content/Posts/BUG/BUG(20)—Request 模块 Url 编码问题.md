---
title: BUG(20)——Request 模块 Url 编码问题
date: 2021-09-16
author: LM
---

## BUG 描述

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

## 复现

```
def import_school():
    api = 'http://192.168.1.240/base/school'
    school_name = ['第一中学', '第二中学', '实验中学']
    jurisdiction = ['荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区']
    county_number = [440103, 440104, 440105, 440106, 440111, 440112, 440113, 440114, 440115, 440117, 440118]
    print(len(jurisdiction))
    print(len(county_number))
    did = "440104002"
    area_id = 3
    data = {"name": "越秀第二中学",
            "is_famous": 2,
            "school_number": 440104,
            "principal": "",
            "telephone": "",
            "address": "",
            "email": "",
            "logo_url": "",
            "icon_url": "",
            "official_website": "",
            "org_web_path": did,
            "area_id": area_id,
            "user_name": did,
            "account": did,
            "password": "7c4a8d09ca3762af61e59520943dc26494f8941b"}
    response = requests.request("POST", api, data=data, headers=headers).json()
    print(response)


if __name__ == "__main__":
    import_school()
```

运行

```
{'info': {'message': '非法参数', 'detail': "invalid character 'a' in literal null (expecting 'u')"}, 'status': 10002}
```

调试，检查response，找到request体，查看body参数内容

```
name=%E8%B6%8A%E7%A7%80%E7%AC%AC%E4%BA%8C%E4%B8%AD%E5%AD%A6&is_famous=2&school_number=440104&principal=&telephone=&address=&email=&logo_url=&icon_url=&official_website=&org_web_path=440104002&area_id=3&user_name=440104002&account=440104002&password=7c4a8d09ca3762af61e59520943dc26494f8941b
```

