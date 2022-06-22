---
title: Python—selenium 控制台报错监听
date: 2022-06-16
author: LM
tags: ["Python"]
---

## 1.实现

```python
_options = EdgeOptions()
d = DesiredCapabilities.EDGE
d['loggingPrefs'] = {'browser': 'ALL'}
_driver_path = r'msedgedriver.exe'
_browser = Edge(service=Service(executable_path=_driver_path), options=_options, capabilities=d)
_browser.get('http://1.1.1.1')
sleep(5)
for entry in _browser.get_log('browser'):
    print(entry)
_browser.close()
```

## 2.loggingPrefs 

```java
public class LogType{
    public static final String BROWSER = "browser";
    public static final String CLIENT = "client";
    public static final String DRIVER = "driver";
    public static final String PERFOMANCE = "performance";
    public static final String PROFILER = "profiler";
    public static final String SERVER = "server";
}
```

