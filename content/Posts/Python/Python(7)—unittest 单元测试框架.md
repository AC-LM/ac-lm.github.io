---
title: Python(7)—unittest 单元测试框架
date: 2020-11-30
author: LM
tags: ["Python"]
---

## 1.Test Case

一个 TestCase 的实例就是一个测试用例。一个完整的测试流程，包括测试前准备环境的搭建(setUp)，执行测试代码 (run)，以及测试后环境的还原(tearDown)。元测试(unit test)的本质也就在这里，一个测试用例是一个完整的测试单元，通过运行这个测试单元，可以对某一个问题进行验证。

```python
class testcase(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        # 所有的测试方法运行前运行，整个测试过程中只执行一次。
        pass
    def setUp(self):
        # 每个测试方法运行前运行，一条用例执行一次，若N次用例就执行N次。
        pass
    def tearDown(self)：
        # 每个测试方法运行结束后运行,一条用例执行一次，若N次用例就执行N次。
    @classmethod
    def tearDownClass(self)：
        # 所有的测试方法运行结束后运行，整个测试过程中只执行一次。
        pass
    def test_01(self):
        # 测试用例
        pass
```

## 2.Test Suite

多个测试用例集合在一起，就是TestSuite，而且TestSuite也可以嵌套TestSuite。

```python
if __name__ == "__main__":
    # 构造TestSuite
    suite = unittest.TestSuite()
    suite.addTest(testcase("test_01"))
    suite.addTest(testcase("test_02"))
    # 执行测试
    runner = unittest.TextTestRunner()
    runner.run(suite)
```

## 3.Test Loader

是用来加载TestCase到TestSuite中的，其中有几个 loadTestsFrom??() 方法，就是从各个地方寻找TestCase，创建它们的实例，然后add到TestSuite中，再返回一个TestSuite实例。

```python
if __name__ == "__main__":
    #此用法可以同时测试多个类
    suite1 = unittest.TestLoader().loadTestsFromTestCase(TestCase1)
    suite2 = unittest.TestLoader().loadTestsFromTestCase(TestCase2)
    suite = unittest.TestSuite([suite1, suite2])
#-------------------------------------------------------------------------------------
# 匹配test_case目录下所有以test开头的py文件，执行这些py文件下的所有测试用例
if __name__ == "__main__":
    test_dir = "./test_case"
    discover = unittest.defaultTestLoader.discover(test_dir, pattern="test*.py")
    runner=unittest.TextTestRunner()
    runner.run(discover)
```

## 4.编写规范

使用unittest编写python的单元测试代码，包括如下几个步骤：

- 1、编写一个python类，继承unittest模块中的TestCase类，这就是一个测试类
- 2、在上面编写的测试类中定义测试方法（这个就是指的测试用例），**每个方法的方法名要求以test打头，没有额外的参数。** 在该测试方法中调用被测试代码，校验测试结果，TestCase类中提供了很多标准的校验方法，如最常见的assertEqual。
- 3、**执行unittest.main() ，该函数会负责运行测试，它会实例化所有TestCase的子类，并运行其中所有以test打头的方法。**

## 5.断言

```python
assertEqual(a, b) #  a == b
assertNotEqual(a, b)  # a != b
assertTrue(x) #  bool(x) is True
assertFalse(x) #  bool(x) is False
assertIs(a, b)  # a is b
assertIsNot(a, b)  # a is not b
assertIsNone(x) #  x is None
assertIsNotNone(x) #  x is not None
assertIn(a, b)  # a in b
assertNotIn(a, b) #  a not in b
assertIsInstance(a, b) #  isinstance(a, b)
assertNotIsInstance(a, b) #  not isinstance(a, b)
```

## 6.unittest 网易邮箱登录案例

```python
import time
import unittest from selenium 
import webdriver from selenium.webdriver.support 
import expected_conditions as EC

class mailLogin(unittest.TestCase):
    def setUp(self):
        url = 'https://mail.yeah.net/'
        self.browser = webdriver.Firefox()
        self.browser.get(url)
        time.sleep(5)
    
    def test_login_01(self):
        '''
        用户名、密码为空
        '''
        self.browser.switch_to.frame("x-URS-iframe")
        self.browser.find_element_by_name('email').send_keys('')
        self.browser.find_element_by_name('password').send_keys('')
        self.browser.find_element_by_id('dologin').click()
        self.browser.switch_to.default_content()
        time.sleep(3)
        name = self.browser.find_element_by_id('spnUid')        
        if name == 'sanzang520@yeah.net':
            print('登录成功')        
        else:
            print('登陆失败')    
            
    def test_login_02(self):
        '''
        用户名正确、密码为错误
        '''
        self.browser.switch_to.frame("x-URS-iframe")
        self.browser.find_element_by_name('email').send_keys('sanzang520')
        self.browser.find_element_by_name('password').send_keys('xxx')
        self.browser.find_element_by_id('dologin').click()
        self.browser.switch_to.default_content()
        time.sleep(3)
        name = self.browser.find_element_by_id('spnUid')        
        if name == 'sanzang520@yeah.net':
            print('登录成功')        
        else:
            print('登陆失败')    
    
    def test_login_03(self):
        '''
        用户名、密码正确
        '''
        self.browser.switch_to.frame("x-URS-iframe")
        self.browser.find_element_by_name('email').send_keys('sanzang520')
        self.browser.find_element_by_name('password').send_keys('xxx')
        self.browser.find_element_by_id('dologin').click()
        self.browser.switch_to.default_content()
        time.sleep(3)
        name = self.browser.find_element_by_id('spnUid')        
        if name == 'sanzang520@yeah.net':
            print('登录成功')        
        else:
            print('登陆失败')    
            
    def tearDown(self):
        self.browser.quit()
        
if __name__ == "__main__":
    unittest.main()
```