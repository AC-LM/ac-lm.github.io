---
title: Python—获取 input 输入的文本值
date: 2021-03-26
author: LM
tags: ["Python"]
---

## 1.get_attribute('value')获取输入的文本值

```python
inputContext1 = driver.find_element_by_xpath('//input').get_attribute('value')
```

## 2.通过执行JS操作来获取输入的文本值

```python
inputContext2 = "return document.getElementsByClassName('ivu-input')[0].value"
driver.execute_script(inputContext2)
```

## 3.get_attribute('textContent')获取元素的文本值

```python
logoContext1 = driver.find_element_by_xpath('//div[@class="logo"]/span').get_attribute('textContent')
```

## 4.通过text来获取文本值

```python
logoContext2 = driver.find_element_by_xpath('//div[@class="logo"]/span').text
```

## 5.通过执行JS操作来获取输入的文本值

```python
logoContext3 = "return document.getElementsByTagName('span')[0].innerText"
```