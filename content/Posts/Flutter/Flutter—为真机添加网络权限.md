---
title: Flutter—为真机添加网络权限
date: 2021-05-14
author: LM
tags: ["Flutter"]
---

## 1.网络权限

在 AndroidManifest.xml 中添加下列代码，注意不要放到 application 中.

```xml
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

