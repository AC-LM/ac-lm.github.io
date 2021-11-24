---
title: Web开发(15)——ES6-ES12的开发技巧
date: 2021-09-17
author: LM
---

> 参考原文：[ ES6-ES12的开发技巧 @Sunshine_Lin ](https://juejin.cn/post/6995334897065787422)

## ES6

### 1.let  和 const

在 ES6 出现了新的变量 let 和 const ，与 var 相比：

- `var`有变量提升，值可变，允许重复声明
- `let`没有变量提升，值可变，不允许重复声明
- `const`没有变量提升，值不可变，但如果是定义对象，则属性可变

```javascript
// let 无变量提升
t = 2;
console.log(t);
let t;
// Cannot access 't' before initialization
console.log(t);
let t;
// t is not defined
t1 = 2;
console.log(t1);
var t1;
// 2
console.log(t1);
var t1;
// undefined
```

PS：变量提升(声明提升)：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。

```javascript
x = 5; // 变量 x 设置为 5
console.log(x)；
var x; // 声明 x
```

实际上，上述代码等于下述代码，在运行时，x 的的声明被提升到最顶部

```javascript
var x; // 声明 x
x = 5; // 变量 x 设置为 5
console.log(x)；
```

需要注意的是，JavaScript 只有声明的变量会提升，初始化的不会。如下述实例中的 y 便输出了 undefined，这是因为变量声明`var y`提升了，但是其初始化`y = 7`并不会提升，所以 y 是一个未定义的变量。

```javascript
console.log(y); // undefined
var y = 7; // 初始化 y
```

上述代码等于

```javascript
var y;
console.log(y);
y = 7;
```

#### let 的对比 var 的优势

let 解决了诸如下述代码的问题

```javascript
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
} // 5 5 5 5 5


for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
} // 0 1 2 3 4
```

这是因为 var 是函数作用域，而 let 是块作用域。所谓块级作用域，就是用`{}`包含的区域，`for，while，if`这些就是。

用户在函数内声明了 var ，整个函数内都是有效的，函数外无法访问，但如果在 for 循环或 if 判断内定义了一个 var 变量，实际上在循环外或判断外也是可以访问的。而由于 let 是块作用域，所以如果在块作用域内（for循环内）定义的变量，在其外面是不可被访问的。

### 2.默认参数

在 ES6 后，用户可以为函数设置默认参数

```javascript
function fn (name = 'ABC', age = 18) {
  console.log(name, age)
}
fn() // ABC 18
fn('ABCD', 22) // ABCD 22
```

### 3.扩展运算符 ( ... )

对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中

```javascript
const arr1 = [1, 2, 4]
const arr2 = [4, 5, 7]
const arr3 = [7, 8, 9]

const arr = [...arr1, ...arr2, ...arr3]
[
  1, 2, 4, 4, 5,
  7, 7, 8, 9
]
const arrs = [...arr, ...[1, 2]]
```

### 4.剩余参数

剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

```javascript
function fn (name, ...params) {
  console.log(name)
  console.log(params)
}
fn ('ABCD', 1, 2) // ABCD [ 1, 2 ]
fn ('ABCD', 1, 2, 3, 4, 5) // ABCD [ 1, 2, 3, 4, 5 ]
```

### 5.模板字符串

```javascript
const name = 'ABCD'
const age = '22'

console.log(`${name}今年${age}岁啦`) // ABCD今年22岁啦
```

### 6.Object.keys

可以用来获取对象的key的集合，进而可以获得对应key的value

```javascript
const obj = {
  name: 'ABCD',
  age: 22,
  gender: '男'
}

const keys = Object.keys(obj)
console.log(keys) // [ 'name', 'age', 'gender' ]
```

### 7.箭头函数

```javascript
const fn = () => {}

// 如果只有一个参数，可以省略括号
const fn = name => {}

// 如果函数体里只有一句return
const fn = name => {
    return 2 * name
}
// 可简写为
const fn = name => 2 * name
// 如果返回的是对象
const fn = name => ({ name: name })
```

普通函数和箭头函数的区别：

- 箭头函数不可作为构造函数，不能使用 new
- 箭头函数没有自己的 this
- 箭头函数没有 arguments 对象
- 箭头函数没有原型对象

### 8.Array.prototype.forEach

ES6 新加的数组遍历方法

```javascript
const eachArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
eachArr.forEach((item, index, arr) => {
  console.log(item, index, arr)
})
1 0 [ 1, 2, 3, 4, 5 ]
2 1 [ 1, 2, 3, 4, 5 ]
3 2 [ 1, 2, 3, 4, 5 ]
4 3 [ 1, 2, 3, 4, 5 ]
5 4 [ 1, 2, 3, 4, 5 ]
```

### 9.Array.prototype.map

返回一个处理过后的新数组

```javascript
const mapArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，对每一个元素进行翻倍
const mapArr2 = mapArr.map((num, index, arr) => 2 * num)
console.log(mapArr2)
[ 2, 4, 6, 8, 10 ]
```

### 10.Array.prototype.filter

过滤数组的方法

```js
const filterArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，返回大于3的集合
const filterArr2 = filterArr.filter((num, index, arr) => num > 3)
console.log(filterArr2)
[ 4, 5 ]
```

### 11.Array.prototype.some

数组数据的只要有一个真就返回真

```javascript
const someArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，只要有一个为true，就返回true，一个都true都没有，就返回false
const someArr2 = someArr.some((bol, index, arr) => bol)
console.log(someArr2)
true
```

### 12.Array.prototype.every

every 跟 some 是相反的，some 是只有一个就行，every 是要所有为真才返回真

```js
const everyArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，需要所有为true，才返回true，否则返回false
const everyArr2 = everyArr.every((bol, index, arr) => bol)
console.log(everyArr2)
```

### 13.Array.prototype.reduce

- 第一个参数 callback 函数： pre 为上次 return 的值，next 为数组的本次遍历的项
- 第二个参数为初始值，也是第一个 pre

举两个例子：

```js
// 计算 1 + 2 + 3 + 4 + 5
const reduceArr = [1, 2, 3, 4, 5]
const sum = reduceArr.reduce((pre, next) => {
  return pre + next
}, 0)
console.log(sum) // 15

// 统计元素出现个数
const nameArr = ['A', 'B', 'A', 'A', 'E']
const totalObj = nameArr.reduce((pre, next) => {
  if (pre[next]) {
    pre[next]++
  } else {
    pre[next] = 1
  }
  return pre
}, {})
console.log(totalObj) // { 'A': 3, B: 1, 'E': 1 }
```

### 14.find 和 findIndex

- find：找到返回被找元素，找不到返回 undefined
- findIndex：找到返回被找元素索引，找不到返回 -1

```javascript
const findArr = [
  { name: '科比', no: '24' },
  { name: '罗斯', no: '1' },
  { name: '利拉德', no: '0' }
]

const kobe = findArr.find(({ name }) => name === '科比')
const kobeIndex = findArr.findIndex(({ name }) => name === '科比')
console.log(kobe) // { name: '科比', no: '24' }
console.log(kobeIndex) // 0
```

### 15.for of  和  for  in

- for in ：以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性。
- for of ：在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

无论是 for in 还是 for of 语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

- for in 语句以任意顺序迭代对象的可枚举属性。
- for of 语句遍历可迭代对象定义要迭代的数据。

我们来看以下示例

```javascript
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';
console.log(iterable)
// [3, 5, 7, foo: 'hello']

for (let i in iterable) {
  console.log(i); 
  // 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); 
    // 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); 
  // 3, 5, 7
}
```

上述代码中每个对象 Object 都将继承 objCustom 的属性，并且作为 Array 的每个对象要继承 arrCustom 属性，因此对象 iterable 继承属性 objCustom 和 arrCustom。

```javascript
for (let i in iterable) {
  console.log(i); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}
```

上述循环打印的是 iterable 对象的所有可枚举属性，它不记录数组元素 3， 5，7 或 hello，因为这些不是枚举属性。它打印了数组的索引以及 arrCustom 和 objCustom。

```javascript
for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // 0, 1, 2, "foo"
  }
}
```

这个循环类似于第一个，但是它使用 hasOwnProperty() 来检查，检查找到的枚举属性是否是对象自己的（不是继承的）。如果是，该属性被记录。记录的属性是0，1，2和 foo，因为它们是自身的属性（不是继承的）。属性 arrCustom 和 objCustom 不会被记录，因为它们是继承的。

```javascript
for (let i of iterable) {
  console.log(i); // 3, 5, 7
}
```

该循环迭代并记录 iterable 作为可迭代对象定义（ iterable，定义时是数组 ）的迭代值，即数组元素 3，5，7。

### 16.Set 和 Map

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的，不重复的。

```js
// 可不传数组
const set1 = new Set()
set1.add(1)
set1.add(2)
console.log(set1) // Set(2) { 1, 2 }
// 也可传数组
const set2 = new Set([1, 2, 3])
// 增加元素 使用 add
set2.add(4)
set2.add('A')
console.log(set2) // Set(5) { 1, 2, 3, 4, 'A' }
// 是否含有某个元素 使用 has
console.log(set2.has(2)) // true
// 查看长度 使用 size
console.log(set2.size) // 5
// 删除元素 使用 delete
set2.delete(2)
console.log(set2) // Set(4) { 1, 3, 4, 'A' }
// 增加一个已有元素，则增加无效，会被自动去重
const set1 = new Set([1])
set1.add(1)
console.log(set1) // Set(1) { 1 }
// 传入的数组中有重复项，会自动去重
const set2 = new Set([1, 2, 'A', 3, 3, 'A'])
console.log(set2) // Set(4) { 1, 2, 'A', 3 }
// 两个对象都是不同的指针，所以没法去重
const set1 = new Set([1, {name: 'A'}, 2, {name: 'A'}])
console.log(set1) // Set(4) { 1, { name: 'A' }, 2, { name: 'A' } }
// 如果是两个对象是同一指针，则能去重
const obj = {name: 'A'}
const set2 = new Set([1, obj, 2, obj])
console.log(set2) // Set(3) { 1, { name: 'A' }, 2 }
// NaN !== NaN，NaN是自身不等于自身的，但是在Set中他还是会被去重
const set = new Set([1, NaN, 1, NaN])
console.log(set) // Set(2) { 1, NaN }
// Set可利用扩展运算符转为数组，以实现数组去重
const arr = [1, 2, 3, 4, 4, 5, 5, 66, 9, 1]
const quchongArr = [...new Set(arr)]
console.log(quchongArr) // [1,  2, 3, 4, 5, 66, 9]
```

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。Map 对比 object 最大的好处就是，key 不受类型限制

```javascript
const map1 = new Map()
// 新增键值对 使用 set(key, value)
map1.set(true, 1)
map1.set(1, 2)
map1.set('哈哈', '嘻嘻嘻')
console.log(map1) // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻嘻' }
// 判断map是否含有某个key 使用 has(key)
console.log(map1.has('哈哈')) // true
// 获取map中某个key对应的value 使用 get(key)
console.log(map1.get(true)) // 2
// 删除map中某个键值对 使用 delete(key)
map1.delete('哈哈')
console.log(map1) // Map(2) { true => 1, 1 => 2 }
// 定义map，也可传入键值对数组集合
const map2 = new Map([[true, 1], [1, 2], ['哈哈', '嘻嘻嘻']])
console.log(map2) // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻嘻' }
```

## ES7

### 17.includes

传入元素，如果数组中能找到此元素，则返回 true，否则返回 false

```javascript
const includeArr = [1, 2 , 3, 'A', 'A']

const isKobe = includeArr.includes('A')
console.log(isKobe) // true
```

跟 indexOf 很像，但还是有区别的

```javascript
const arr = [1, 2, NaN]
console.log(arr.indexOf(NaN)) // -1  indexOf找不到NaN
console.log(arr.includes(NaN)) // true includes能找到NaN
```

### 18.求幂运算符

ES7提供了求幂运算符：`**`

```javascript
const num = 3 ** 2 // 9
```

## ES8

### 19.Object.values

可以用来获取对象的 value 的集合

```javascript
const obj = {
  name: 'A',
  age: 22,
  gender: '男'
}

const values = Object.values(obj)
console.log(values) // [ 'A', 22, '男' ]
```

### 20.Object.entries

可以用来获取对象的键值对集合

```javascript
const obj = {
  name: 'A',
  age: 22,
  gender: '男'
}

const entries = Object.entries(obj)
console.log(entries) 
// [ [ 'name', 'A' ], [ 'age', 22 ], [ 'gender', '男' ] ]
```

## ES10

### 21.Array.flat

二维数组变一维数组

```javascript
const arr = [1, 2, 3, [4, 5, 6]]

console.log(arr.flat()) // [ 1, 2, 3, 4, 5, 6 ]
```

还可以传参数，参数为降维的次数

```javascript
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]

console.log(arr.flat(2))
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
```

如果传的是一个无限大的数字，那么就实现了多维数组(无论几维)降为一维数组

```javascript
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]

console.log(arr.flat(Infinity))
[
   1,  2, 3, 4,  5,
   6,  7, 8, 9, 10,
   11, 12
]
```

### 22.Object.fromEntries

ES8 的 Object.entries 是把对象转成键值对数组，而 Object.fromEntries 则相反，是把键值对数组转为对象

```javascript
const arr = [
  ['name', 'A'],
  ['age', 22],
  ['gender', '男']
]

console.log(Object.fromEntries(arr)) // { name: 'A', age: 22, gender: '男' }
```

此外还可以把 Map 转换为对象

```javascript
const map = new Map()
map.set('name', 'A')
map.set('age', 22)
map.set('gender', '男')

console.log(map) // Map(3) { 'name' => 'A', 'age' => 22, 'gender' => '男' }

const obj = Object.fromEntries(map)
console.log(obj) // { name: 'A', age: 22, gender: '男' }
```

### 23.String.trimStart && String.trimEnd

trim 方法，可以清除字符串首尾的空格

```js
const str = '    A    '
console.log(str.trim()) // 'A'
```

trimStart 和trimEnd 用来单独去除字符串的首和尾的空格

```js
const str = '    林三心    '

// 去除首部空格
console.log(str.trimStart()) // '林三心   '
// 去除尾部空格
console.log(str.trimEnd()) // '   林三心'
```

### 24.?? 和 ?.

`?.`中文名为可选链，可以使某些空变量，可以进行操作

比如有一个对象，我要取一个可能不存在的值，甚至我们都不确定obj是否存在

```js
const obj = {
  cat: {
    name: '哈哈'
  }
}
const dog = obj && obj.dog && obj.dog.name // undefined

// 可选链
const obj = {
  cat: {
    name: '哈哈'
  }
}
const dog = obj?.dog?.name // undefined
```

比如有一个数组，我不确定它存不存在，存在的话就取索引为1的值

```js
const arr = null
// do something
const item = arr && arr[1]

// 可选链
const arr = null
// do something
const item = arr?.[1]
复制代码
```

比如有一个函数，我们不确定它存不存在，存在的话就执行它

```js
const fn = null
// do something
const res = fn && fn()

// 可选链
const fn = null
// do something
const res = fn?.()
复制代码
```

`??`中文名为空位合并运算符，`??`和`||`最大的区别是，`??`只有`undefined, null`才算假值

```js
const a = 0 || 'A' // A
const b = '' || 'A' // A
const c = false || 'A' // A
const d = undefined || 'A' // A
const e = null || 'A' // A
const a = 0 ?? 'A' // 0
const b = '' ?? 'A' // ''
const c = false ?? 'A' // false
const d = undefined ?? 'A' // A
const e = null ?? 'A' // A
```

### 25.数字分隔符

数字分隔符可以让你在定义长数字时，更加地一目了然

```js
const num = 1000000000

// 使用数字分隔符
const num = 1_000_000_000
```
