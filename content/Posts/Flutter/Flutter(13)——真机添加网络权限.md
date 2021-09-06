---
title: Flutter(13)——真机添加网络权限
date: 2021-05-14
author: LM
---

## android

在AndroidManifest.xml中添加下列代码，注意不要放到application中.

```xml
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

