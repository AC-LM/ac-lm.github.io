---
title: Django(1)——Models
date: 2021-06-03
author: LM
---

## 模型的基本概念

每个模型都是一个 Python 的类，这些类继承自`django.db.models.Model`。模型类的每个属性都相当于一个数据库的字段。

```python
from django.db import models
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

上述代码相当于使用数据库语言创建一个Person表单，有两个字段 first_name 与 last_name

```python
CREATE TABLE myapp_person (
    "id" serial NOT NULL PRIMARY KEY,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(30) NOT NULL
);
```

## 使用模型

定义模型后，需要告诉 Django 你将使用这些模型。通过编辑你的设置文件 setting.py，改变 INSTALLED_APPS  设置来添加包含你的 models.py 的模块的名称来实现这一点。

```python
 INSTALLED_APPS = [
    #...
    'myapp', #模块名
    #...
]
```

## 字段

## 字段类型

## 字段选项

- max_length：该参数指定用于存储数据的VARCHAR 数据库字段的大小。
- null：如果是True，Django会将空置的值存储为 NULL。默认是False。
- blank ：如果是True，这个字段是空白的。默认是False。注意，这与null不同的是，null与数据库相关，而blank则是与验证相关的。如果一个字段有 blank=True ，表单验证就允许输入空值。如果一个字段有blank=False ，则需要字段。
- choices：2元组的可迭代，例如，列表或元组的元素选择。
- default：字段的默认值。
- unique：如果是真的，这个字段必须在整个表中是唯一的。
- related_nam：使用外键时调用的名字。

## 自动主键字段

在默认情况下，Django默认提供了主键字段：`id = models.AutoField(primary_key=True)`

这是一个自动递增的主键。如果您想要指定一个定制的主键，请在您的一个字段中指定  primarykey=True。如果Django看到你已经明确地设置了字段。主键，它不会添加自动id。

## 关联关系

显然，关系数据库的功能在于将表相互关联起来。Django提供了定义三种最常见的数据库关系类型的方法：多对一、多对多和一对一。

注意某些版本必须给定on_delete属性值才能创建关联关系。

- models.CASCADE(默认选项)：当Wife关联的Husband被删除时，Wife也会被一同删除，反之，Husband不会被删除。
- models.PROTECT(保护选项)：设置该选项后，若要删除Husband的数据，且该数据关联Wife中的数据，此时系统会报错提示数据受保护，反之可以正常删除。

- models.SET_NULL(空值选项)：设置该选项后，若要删除Husband的数据，且该数据关联Wife中的数据，可正常删除，且Wife不会被删除，此时会把Wife的关联数据设置为空，注意使用此选项时必须设置null=True（允许空值），否则会出现异常。

- models.SET_DEFAULT(默认值选项)：该选项与SET_NULL类似，当删除与Wife绑定的Husband时，会把Wife的关联数据设置为默认值，注意使用此选项时必须设置Default=你设置的默认值，否则会出现异常。

- models.SET()：当删除与Wife绑定的Husband时，会把Wife的关联数据设置为括号内的值，注意防止设置的值与其他设置冲突。

### 多对一

字段ForeignKey

例如，如果一个“汽车”模型有一个“制造商”——也就是说，“制造商”生产多辆汽车，但每辆车都只有一个“制造商”——使用以下定义：

```python
from django.db import models

class Manufacturer(models.Model):
    # ...
    pass

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...
```

### 多对多

字段ManyToManyField

例如，一个“pizza”有多个“topping”的对象，而一个“topping”也可以在多个”pizza“上——使用以下定义：

```python
class Topping(models.Model):
    # ...
    pass

class Pizza(models.Model):
    # ...
    toppings = models.ManyToManyField(Topping)
```

### 多对多关系中的额外字段

当您只处理简单的多对多关系时，例如混合和匹配比萨饼和浇头，ManyToManyField只需要一个标准 。但是，有时您可能需要将数据在两个模型之间的关系相关联。

例如，考虑应用程序跟踪音乐家所属的音乐组的情况。一个人与他们所属的团体之间存在多对多的关系，因此您可以使用aManyToManyField来表示这种关系。但是，您可能希望收集的成员资格有很多详细信息，例如此人加入该组的日期。

对于这些情况，Django允许您指定将用于管理多对多关系的模型。然后，您可以在中间模型上添加额外的字段。中间模型与ManyToManyField 使用 through参数指向将充当中介的模型相关联 。对于我们的音乐家示例，代码看起来像这样：

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='Membership')

    def __str__(self):
        return self.name

class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

### 一对一

字段OneToOneField

事实上，处理这通常使用继承，它涉及隐式的一对一关系）。

## Meta选项

Django模型类的Meta是一个内部类，它用于定义一些Django模型类的行为特性。

- abstract：定义当前的模型是不是一个抽象类。所谓抽象类是不会对应数据库表的。一般我们用它来归纳一些公共属性字段，然后继承它的子类可以继承这些字段。
- get_latest_by：指定一个DateField或者DateTimeField。这个设置让你在使用model的Manager上的lastest方法时，默认使用指定字段来排序。
- ordering：这个字段是告诉Django模型对象返回的记录结果集是按照哪个字段排序的。这是一个字符串的元组或列表，没有一个字符串都是一个字段和用一个可选的表明降序的'-'构成。当字段名前面没有'-'时，将默认使用升序排列。使用'?'将会随机排列。
- verbose_name：给模型类起一个更可读的名字，一般定义为中文。
- verbose_name_plural：指定模型的复数形式是什么。

```python
class Ox(models.Model):
    horn_length = models.IntegerField()

    class Meta:
        ordering = ["horn_length"]
        verbose_name_plural = "oxen"
        ordering=['order_date'] # 按订单升序排列
        ordering=['-order_date'] # 按订单降序排列，-表示降序
        ordering=['?order_date'] # 随机排序，？表示随机
        ordering=['-pub_date','author'] # 以pub_date为降序，在以author升序排列
```

## 模型属性

模型最重要的属性是 Manager。使用Manager定义objects，为Django模型提供数据库查询操作的接口，用于从数据库中检索实例。如果Manager未定义，管理员只能通过模型类访问，而不能通过模型实例访问。

```python
objects = models.manager
```

------

## 模型方法

\_\_str\_\_()：Python“魔术方法”，返回任何对象的字符串表示形式。这是Python和Django在模型实例需要被强制并显示为纯字符串时将使用的内容。

## 继承模型

Django中有三种可能的继承方式。

- 通常，您只想使用父类来保存您不希望为每个子模型键入的信息。这个类不会被孤立使用，所以抽象基类就是你所追求的。
- 如果你是现有模型的子类（可能是完全来自另一个应用程序的东西），并希望每个模型都有自己的数据库表，那么多表继承是最佳选择。
- 最后，如果您只想修改模型的Python级行为，而不以任何方式更改模型字段，则可以使用代理模型。

### 抽象基类

当您想要将一些公共信息放入许多其他模型时，抽象基类非常有用。你写你的基类，并把abstract=True在元类。然后，此模型将不用于创建任何数据库表。相反，当它用作其他模型的基类时，其字段将添加到子类的字段中。

一个例子：

```python
from django.db import models

class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True

class Student(CommonInfo):
    home_group = models.CharField(max_length=5)
```

该 Student 模型将有三个字段：name，age和 home_group。该CommonInfo模型不能用作普通的Django模型，因为它是一个抽象基类。它不生成数据库表或具有管理器，并且无法直接实例化或保存。

从抽象基类继承的字段可以使用其他字段或值覆盖，也可以使用None删除。

### Meta继承

当创建抽象基类时，Django使您在基类中声明的任何Meta内部类可用作属性。如果子类没有声明自己的Meta类，它将继承父类的Meta。如果孩子想要扩展父类的Meta类，它可以将其子类化。例如：

```python
from django.db import models

class CommonInfo(models.Model):
    # ...
    class Meta:
        abstract = True
        ordering = ['name']

class Student(CommonInfo):
    # ...
    class Meta(CommonInfo.Meta):
        db_table = 'student_info'
```

Django确实对抽象基类的Meta类进行了一次调整：在安装Meta属性之前，它设置了abstract=False。这意味着抽象基类的子项本身不会自动成为抽象类。当然，您可以创建一个继承自另一个抽象基类的抽象基类。您只需要记住abstract=True每次都明确设置。

在抽象基类的Meta类中包含一些属性是没有意义的。例如，包含db_table意味着所有子类（未指定自己的Meta）将使用相同的数据库表，这几乎肯定不是您想要的。

### 多表继承

Django支持的第二种模型继承是当层次结构中的每个模型都是模型本身时。每个模型对应于自己的数据库表，可以单独查询和创建。继承关系引入子模型与其每个父模型之间的链接（通过自动创建 OneToOneField ）。例如：

```python
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(Place):
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)
```

尽管数据将驻留在不同的数据库表 Place 中 Restaurant，但所有字段都将可用。所以这些都是可能的：

```python
Place.objects.filter(name="Bob's Cafe")
Restaurant.objects.filter(name="Bob's Cafe")
```

### Meta和多表继承

在多表继承情况下，子类从其父类的Meta类继承是没有意义的。所有的Meta选项都已经应用于父类，并且再次应用它们通常只会导致矛盾的行为（这与基类本身不存在的抽象基类情况形成对比）。

因此，子模型无法访问其父级的Meta类。但是，有一些有限的情况，子进程从父进程继承行为：如果子进程没有指定 ordering属性或get_latest_by属性，它将从其父进程继承它们。

如果父级有一个排序而你不希望孩子有任何自然顺序，你可以明确地禁用它：

```python
class ChildModel(ParentModel):
    # ...
    class Meta:
        # Remove parent's ordering effect
        ordering = []
```

### 代理模型

使用多表继承时，会为模型的每个子类创建一个新的数据库表。这通常是所需的行为，因为子类需要一个位置来存储基类上不存在的任何其他数据字段。但是，有时您只想更改模型的Python行为 - 可能更改默认管理器或添加新方法。

这就是代理模型继承的用途：为原始模型创建代理。您可以创建，删除和更新代理模型的实例，并且将保存所有数据，就像使用原始（非代理）模型一样。不同之处在于您可以更改代理中的默认模型排序或默认管理器等内容，而无需更改原始内容。

代理模型声明为普通模型。你通过设置类的proxy属性告诉Django它是一个代理模型。

例如，假设您要向Person模型添加方法。你可以这样做：

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class MyPerson(Person):
    class Meta:
        proxy = True

    def do_something(self):
        # ...
        pass
```

你仍然可以使用一个代理模型来定义模型的默认排序方法，你也许不会想一直对“Person”进行排序，但是通常情况下用代理模型根据“姓氏”属性进行排序这很简单。：

```python
class OrderedPerson(Person):
    class Meta:
        ordering = ["last_name"]
        proxy = True
```

### 基类限制

一个代理模型必须仅能继承一个非抽象模型类。你不能继承多个非抽象模型类，因为代理模型无法提供不同数据表的任何行间连接。一个代理模型可以继承任意数量的抽象模型类，假如他们*没有*定义任何的模型字段。一个代理模型也可以继承任意数量的代理模型，只需他们共享同一个非抽象父类

### 模型代理管理器

如果未在代理模型上指定任何模型管理器，它将从其模型父项继承管理器。如果您在代理模型上定义管理器，它将成为默认管理器，尽管在父类上定义的任何管理器仍然可用。

继续上面的示例，您可以更改查询Person模型时使用的默认管理器，如下所示：

```python
from django.db import models

class NewManager(models.Manager):
    # ...
    pass

class MyPerson(Person):
    objects = NewManager()

    class Meta:
        proxy = True
```

如果要在不更换现有默认值的情况下向代理添加新管理器，可以使用自定义管理器文档中描述的技术：创建包含新管理器的基类，并在主基类之后继承：

```python
# Create an abstract class for the new manager.
class ExtraManagers(models.Model):
    secondary = NewManager()

    class Meta:
        abstract = True

class MyPerson(Person, ExtraManagers):
    class Meta:
        proxy = True
```

### 多重继承

正如Python的子类化一样，Django模型可以从多个父模型继承。请记住，正常的Python名称解析规则适用。特定名称（例如Meta）出现的第一个基类将是使用的基类; 例如，这意味着如果多个父类包含一个Meta类，则只会使用第一个类，而将忽略所有其他类。

通常，您不需要从多个父级继承。这有用的主要用例是“混入”类：向每个继承混合的类添加特定的额外字段或方法。尽量使您的继承层次结构尽可能简单明了，这样您就不必费力去找出特定信息来自哪里。

请注意，从具有公共id主键字段的多个模型继承将引发错误。要正确使用多重继承，可以AutoField在基本模型中使用explici

```python
class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    #...

class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    #...

class BookReview(Book, Article):
    pass
```

## 增删查改

### 查

- models.UserInfo.objects.all()
- models.UserInfo.objects.all().values('user')  # 只取 user 列
- models.UserInfo.objects.all().values_list('id','user')  # 取出 id 和 user 列，并生成一个列表
- models.UserInfo.objects.get(id=1)
- models.UserInfo.objects.get(user='yangmv')
- models.Tb1.objects.filter(id__in=[11, 22, 33])  # 获取 id 等于 11、22、33 的数据
- models.Tb1.objects.exclude(id__in=[11, 22, 33]) # not in

### 增

- models.UserInfo.objects.create(user='yangmv',pwd='123456')
- obj = models.UserInfo(user='yangmv',pwd='123456')；obj.save()
- dic = {'user':'yangmv','pwd':'123456'}；models.UserInfo.objects.create(**dic)

### 删

- models.UserInfo.objects.filter(user='yangmv').delete()

### 改

- models.UserInfo.objects.filter(user='yangmv').update(pwd='520')
- obj = models.UserInfo.objects.get(user='yangmv')；obj.pwd = '520'；obj.save()

