---
title: allure(1)——测试报告生成
date: 2021-01-05
author: LM
---

## 1.命令使用

```python
#----- generate ------------------------------
allure generate DIR -o DIR -c DIR
# 参数：-c, --clean 在生成新的Allure报告之前，先清除该目录
# 参数： -o, --report-dir, --output 指定目录生成allure报告

#----- open ------------------------------
allure open DIR
# 参数：-h, --host  指定域名地址
# 参数：-p, --port  指定端口号

#----- serve ------------------------------
allure serve./report/html
# 参数：-h, --host  指定域名地址
# 参数：-p, --port  指定端口号

# 测试执行，在指定目录DIR生成allure报告与如果目录存在则清除目录
pytest --alluredir=DIR --clean-alluredir
```

## 2.生成报告(前台)

```shell
pytest --alluredir=/tmp/my_allure_results  # 执行测试
allure serve /tmp/my_allure_results -p 33333  # 生成报告
```

## 3.生成报告(后台)

```shell
nohup allure serve /tmp/my_allure_results -p 33333 >/tmp/run.log 2>&1 &
ps aux | grep allure
pkill -f allure
#-或------------------------------------------------------------
nohup allure open /tmp/result -p 33333 >run.log 2>&1 &
allure generate /tmp/my_allure_results -o /tmp/result -c
```

## 4.allure.attach()附件

```python
# 使用 allure.attach() 来插入一段自己写的HTML 和 allure.attach.file() 来导入一个已存在的HTML文件
allure.attach(body, name, attachment_type, extension)
allure.attach.file(source, name, attachment_type, extension)
"""
body：要显示的内容（附件）
name：附件名字
attachment_type：附件类型，是 allure.attachment_type 里面的其中一种
extension：附件的扩展名（比较少用）
source：文件路径，相当于传一个文件
"""
```

## 5.allure的语法糖@

```python
@allure.feature('功能名称')
class Test:
    pass
@allure.issue("测试网站") 
@allure.link("链接")
@allure.testcase("测试ID")
@allure.description("说明")
@allure.story('子功能名称') / @allure.title('标题')
def Test(self):
    pass
@allure.step('步骤')
@allure.severity('级别')
'''严重级别
Blocker级别：中断缺陷（客户端程序无响应，无法执行下一步操作）
Critical级别：临界缺陷（ 功能点缺失）
Normal级别：普通缺陷（数值计算错误）
Minor级别：次要缺陷（界面错误与UI需求不符）
Trivial级别：轻微缺陷（必输项无提示，或者提示不规范）
'''
```

## 6.用例的描述

```python
# 注释即为描述
"""
描述
"""
```

## 7.allure.dynamic()动态报告

```python
allure.dynamic.feature()
allure.dynamic.link()
allure.dynamic.issue()
allure.dynamic.testcase()
allure.dynamic.story()
allure.dynamic.title()
allure.dynamic.description()
```