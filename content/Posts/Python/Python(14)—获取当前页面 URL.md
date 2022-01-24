---
title: Python(14)—获取当前页面URL
date: 2021-01-04
author: LM
tags: ["Python"]
---

## 1.直接获取

```python
driver=webdriver.Chrome()
driver.get('http:/www.baidu.com')
print(driver.current_url)
driver.quit()
```

## 2.问题

当浏览器新开页面后 current_url() 获取的还是原页面URL，这是因为浏览器还没有定位到新开的页面

## 3.解决

添加定位页面代码之后再使用current_url获取地址

```python
driver=webdriver.Chrome()
driver.get('http:/www.baidu.com')
# 跳转到新页面
driver.find_element_by_link_text('新闻').click()
#切换当前页面标签
driver.switch_to.window(driver.window_handles[1])
print(driver.current_url)
driver.quit()
```
