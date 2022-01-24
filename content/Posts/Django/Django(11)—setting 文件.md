---
title: Django(11)—setting 文件
date: 2021-07-27
author: LM
tags: ["Django"]
---

## 1.setting.py 配置文件

- `BASE_DIR`：即为项目所在目录，`__file__`可以获得当前文件的路径。
- `SECRET_KEY`：一个特殊的 Django 安装的密钥，每当使用`Django-admin startproject`时会自动生成一个。
- `DUBUG`：默认值为 FALSE，当选择 TRUE 时，当我们的项目出错时可以使我们看到出错信息，但是为了防止被用户看到或者他人攻击，在项目上线后应改为 FALSE。
- `ALLOWED_HOSTS`：默认值是一个空列表，列表中的值为哪些域名可以访问我们的 Django 项目。
- `INSTALLED_APPS`：安装的 APP 列表，Django 为我们默认添加了一些自带的项目，每个新创建的 APP 都要加入这个列表才可以被使用。
- `MIDDLEWARE`：这是将要使用的中间件列表。
- `ROOT_URLCONF`：表示根 URLconf 的完整 Python 导入路径。
- `TEMPLATES`：模板文件配置。
- `WSGI_APPLICATION`：配置 Django 项目的 WSGI 服务路径。
- `DATABASES`：Django 的数据库设置，Django 默认的是 sqlite3 数据库。ENGINE 是选择对应我们选择的数据库的引擎，NAME 是数据库名称，HOST 是连接数据库所要用到的主机，还有 PORT 选择端口等许多选项。
- `AUTH_PASSWORD_VALIDATORS`：用于检查用户密码强度的验证器列表，在为空的情况下就接受任意强度的用户密码。
- `LANGUAGE_CODE`：Django 项目的语言代码，默认值为 en-us，值 zh-hans 汉语。
- `TIME_ZONE`：时区，默认值是 UTC。当 USE_TZ 为 TRUE 时，无论 TZ 设置为何值 Django 都会使用系统默认的时区，例如要使用上海的时区则需将 USE_TZ=FALSE，TIME_ZONE='Asia/Shanghai'。
- `USE_I18N`：国际化，Django 允许开发者指定要翻译的字符串，也可以让访问者进行语言选择。
- `USE_L10N`：是否选择启用数据的本地化。
- `USE_TZ`：如果开启了 Time Zone 功能，则所有的存储和内部处理，甚至包括直接 print 显示全都是UTC的。只有通过模板进行表单输入/渲染输出的时候，才会执行 UTC 本地时间的转换。
- `STATIC_URL`：静态目录的所有文件，存放 css，js 等文件。
- `STATICFILES_DIRS`：static 文件的路径。
- `MEDIA_URL`：与 STATIC_URL 类似，存放用户上传的文件。

## 2.示例文件

```python
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 引入os，os包可以对文件进行操作管理
SECRET_KEY = '^#kms19!iawj2b&v3egmynpfwj8^v@2f(_1+jlw+#^vy^pg7oy'
# 随机生成的密钥
DEBUG = True
# 代表是调试环境
ALLOWED_HOSTS = []
# 允许的主机路径，不填写或者ALLOWED_HOSTS = [“*”]代表允许任意主机域名，如果要指定，在里面输入，
# 比如域名只允许为 www.baidu.com 那么 ALLOWED_HOSTS = [“www.baidu.com”]
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
]
# 当前项目应用，只有加入这里才能进行模型同步等操作,注册app等
MIDDLEWARE = [
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# django的中间件,自己写的中间件要在这里填写路径注册,才会生效
ROOT_URLCONF = 'untitled.urls'
# 主路由，也就是项目的主urls(根urls) 
TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'templates')]
    ,
    'APP_DIRS': True,
    'OPTIONS': {
      'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
      ],
    },
  },
]
# 模版的处理,包括路径,处理的包等
WSGI_APPLICATION = 'untitled.wsgi.application'
# 启动定义,将使用的WSGI应用程序对象的完整Python路径
DATABASES = {
  "default": {
    "ENGINE": "django.db.backends.mysql",
    "NAME": "practice", # 需要自己手动创建数据库
    "USER": "root",
    "PASSWORD": "318",
    "HOST": "127.0.0.1",
    "POST": 3306
  }
}
# 数据库相关配置
AUTH_PASSWORD_VALIDATORS = [
  {
    'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
  },
]
# 启用密码验证
LANGUAGE_CODE = 'en-us'
# 语言 如中文: LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'UTC'
# 时区  如中国上海时区: TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
# 国际化
USE_L10N = True
"""
如果USE_L10N设置为True，则区域设置指定的格式具有更高的优先级 
admin 的时候想显示格式化时间，必须把 USE_L10N = False
"""
USE_TZ = True
# 系统时区
LOGGING = {
  'version': 1,
  'disable_existing_loggers': False,
  'handlers': {
    'console':{
      'level':'DEBUG',
      'class':'logging.StreamHandler',
    },
  },
  'loggers': {
    'django.db.backends': {
      'handlers': ['console'],
      'propagate': True,
      'level':'DEBUG',
    },
  }
}
# Django利用python提供的logging模块，记录日志。
STATIC_URL = '/static/'
# 静态文件配置 如:
"""
STATICFILES_DIRS = [
  os.path.join(BASE_DIR, 'static'),
  ]
"""
# 自己定义时间显示格式 如:
"""
DATE_FORMAT = 'Y-m-d'
DATETIME_FORMAT = 'Y-m-d H:i:s'
"""
# 定义视图需要的一些限制 如:
"""
MAX_CUSTOMER_NUM = 3 #数量限制
"""
```

