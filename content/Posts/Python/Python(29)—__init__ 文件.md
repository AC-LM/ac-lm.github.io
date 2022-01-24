---
title: Python(29)—__init__ 文件
date: 2021-06-03
author: LM
tags: ["Python"]
---

## 1.作用

- 标识该目录是一个 python 的模块包（module package）。
- 初始化导入操作，当使用 import 导入该目录时，会执行 `__init__.py` 里面的代码。

在`__init__`.py 里面加一个 `print("You have imported mypackage")`，如果执行了该文件就会输出，很显然，`__init__`.py 会在包被导入时执行。

```cmd
# 文件构造
└── mypackage
    ├── __init__.py
    ├── subpackage_1
    │   ├── test11.py
    │   └── test12.py
    ├── subpackage_2
    │   ├── test21.py
    │   └── test22.py
    └── subpackage_3
        ├── test31.py
        └── test32.py

>>> import mypackage
You have imported mypackage
```

## 2.from ..... import *

这里使用到了`__all__`变量，`__all__`关联了一个模块列表，当执行 from ..... import * 时，就会导入列表中的模块。可以将 `__init__.py` 增加一个`__all__`变量。

```cmd
__all__ = ['subpackage_1', 'subpackage_2']

>>> from mypackage import *
>>> dir()
['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'subpackage_1', 'subpackage_2']
>>> 
>>> dir(subpackage_1)
['__doc__', '__loader__', '__name__', '__package__', '__path__', '__spec__']
```

显然导入了`__all__`变量的内容，但需要注意的是，此时子目录的中的模块没有导入，即不会导入`test*`等文件。

上述导入操作会继续查找 subpackage_1 和 subpackage_2 中的 `__init__.py` 并执行，但不会执行 import *，默认只导入第一个。

```cmd
>>> from mypackage import *
>>> dir()
['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'subpackage_1', 'subpackage_2']
>>> 
>>> dir(subpackage_1)
['__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', 'test11']
```

如果想要导入子包的所有模块，则需要更精确指定。

```cmd
>>> from mypackage.subpackage_1 import *
>>> dir()
['__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'test11', 'test12']
```