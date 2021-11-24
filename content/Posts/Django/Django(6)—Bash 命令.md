---
title: Django(6)—Bash 命令
date: 2021-06-15
author: LM
---

## 1.安装

```python
pip install django
python -m django --version
```

## 2.配置项目

```python
django-admin startproject 项目名称
python manage.py startapp 应用名称
```

## 3.启动服务器

```python
python manage.py runserver
python manage.py runserver 8080
python manage.py runserver 0.0.0.0:8000
```

## 4.初始化数据库

```python
python manage.py makemigrations 应用名称 #记录改动
python manage.py migrate #创建表
python manage.py createsuperuser
```

