---
title: Django(6)——系统命令
date: 2021-06-15
author: LM
---

```python
pip install django
django-admin startproject 项目名称
python manage.py runserver
python -m django --version
python manage.py runserver 8080
python manage.py startapp 应用名称
LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai'
python manage.py makemigrations 应用名称 #记录改动
python manage.py migrate #创建表
python manage.py createsuperuser
```

