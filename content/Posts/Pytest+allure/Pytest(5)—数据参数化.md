---
title: Pytest(5)—数据参数化
date: 2021-07-23
author: LM
tags: ["Pytest"]
---

> 参考原文：[ 参数化@pytest.mark.parametrize @小菠萝测试笔记  ](https://www.cnblogs.com/poloyy/p/12675457.html)

## 1.使用`fixtrue.params`参数实现参数化

### a.通过 request.param 返回参数值

```python
data = ['anjing', 'test', 'admin']

@pytest.fixture(params=data)
def login(request):
    print('登录功能')
    yield request.param
    print('退出登录')
```

### b.使用

参数化的值可以做为返回值使用

```python
def test_01(self, login):
        print('---用例01---')
        print('用户名：%s' % login)
```

### c.自定义控制台提示信息

```python
@pytest.fixture(params=data, ids=['This is anjing','This is admin', 'This is test'])
def login(request):
    print('登录功能')
    yield request.param
    print('退出登录')
```

## 2.`@pytest.mark.parametrize`实现参数化

### a.使用

`def parametrize(self,argnames,argvalues,indirect=False,ids=None,scope=None)`

`argnames`：参数名称，字符串，多个使用逗号隔开

`argvalues`：值，必须是列表

`indirect`：是否作为函数执行

```python
@pytest.mark.parametrize("test_input,expected", [("3+5", 8), ("2+4", 6), ("6*9", 42)])
def test_eval(test_input, expected):
    print(f"测试数据{test_input},期望结果{expected}")
    assert eval(test_input) == expected
```

### b.装饰测试类

当装饰器`@pytest.mark.parametrize`装饰测试类时，会将数据集合传递给类的所有测试用例方法。注意，此时所有的测试方法都必须传入这些参数

```python
@pytest.mark.parametrize('a, b, expect', data_1)
class TestParametrize:

    def test_parametrize_1(self, a, b, expect):
        print('\n测试函数11111 测试数据为\n{}-{}'.format(a, b))
        assert a + b == expect

    def test_parametrize_2(self, a, b, expect):
        print('\n测试函数22222 测试数据为\n{}-{}'.format(a, b))
        assert a + b == expect
```

### c.多个参数化

一个函数或一个类可以装饰多个 `@pytest.mark.parametrize` ，这种方式，最终生成的用例数是`n*m`

```python
data_1 = [1, 2, 3]
data_2 = ['a', 'b']

@pytest.mark.parametrize('a', data_1)
@pytest.mark.parametrize('b', data_2)
def test_parametrize_1(a, b):
    print(f'笛卡尔积 测试数据为 ： {a}，{b}')
```

## 3.参数化的作用

当用例为测试数据与结果的交互时，便可使用参数化以节省代码量。如登录用例，结果成功或失败，但事件可以是账号空，密码空，账号密码都空，密码错误，账号不存在等，此时使用参数化可极大的减少代码量

