---
title: Python(6)—Qrcode
date: 2020-09-29
author: LM
---

## 1.什么是二维码

二维码其实可以看成是一种数据的加密，在这里面的数据，可以通过某种编码，转化成黑白不同的点，然后按顺序排列其中。当我们去识别二维码的时候，其实就是把这些数据转化回来。

根据二维码其不同的编码类型，版本，以及纠错级别，二维码的复杂程度会有所变化。其中版本分 1-40 个级别，版本越高，能存储的数据就越多，用公式来表示就是这样：v X 4+17 。而纠错级别又分为 L、M、Q、H，有时候你可能看到有些二维码整的花里胡哨，或者有的地方缺失了还是能被识别，这可能是这张二维码的容错级别比较高。而级别越低，纠错能力越低，但是能存储更多的数据。而这些格式信息，都可以在三个大方块的边沿定义，三个大方块作为定位的标志，然后剩下的区域就是来放数据码和纠错码。

Qrcode 就是 Python 中二维码的处理库

## 2.安装

```python
pip install qrcode
```

## 3.使用

```python
import qrcode
qr = qrcode.QRCode(
    version=3,
    error_correction=qrcode.constants.ERROR_CORRECT_Q,
    box_size=10,
    border=4,
)
qr.add_data('This is a qrcode')
qr.make(fit=True)
img=qr.make_image(fill_color='black',back_color='white')
img.show()
```

