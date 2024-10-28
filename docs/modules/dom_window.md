[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/window

# Module: dom/window

## Table of contents

### Functions

- [getClientSize](dom_window.md#getclientsize)
- [getClientXY](dom_window.md#getclientxy)
- [getDocSize](dom_window.md#getdocsize)
- [getOffset](dom_window.md#getoffset)
- [getOffsetDistance](dom_window.md#getoffsetdistance)
- [getOuterHeight](dom_window.md#getouterheight)
- [getScroll](dom_window.md#getscroll)
- [getViewportSize](dom_window.md#getviewportsize)

## Functions

### getClientSize

▸ **getClientSize**(): `Object`

获取客户端窗口的尺寸

此方法用于获取当前浏览器窗口的宽度和高度。
如果在非客户端环境中调用（例如服务器端），将返回 {width: 0, height: 0}。

#### Returns

`Object`

包含窗口宽度和高度的对象

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

src/dom/window.ts:11

___

### getClientXY

▸ **getClientXY**(`event`): `Object`

获取鼠标或触摸事件的坐标位置

**`Description`**

此方法用于统一获取鼠标事件和触摸事件的客户端坐标。它会根据事件类型自动判断并返回正确的坐标值。
返回的坐标是相对于浏览器视口的绝对位置，不受页面滚动影响。

**`Example`**

```ts
在事件处理函数中使用
element.addEventListener('click', (event) => {
  const { clientX, clientY } = getClientXY(event);
  console.log('点击位置:', clientX, clientY);
});

触摸事件中使用
element.addEventListener('touchstart', (event) => {
  const { clientX, clientY } = getClientXY(event);
  console.log('触摸位置:', clientX, clientY);
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MouseEvent` \| `TouchEvent` | 鼠标事件或触摸事件对象 |

#### Returns

`Object`

返回包含clientX和clientY的坐标对象

| Name | Type |
| :------ | :------ |
| `clientX` | `number` |
| `clientY` | `number` |

#### Defined in

src/dom/window.ts:194

___

### getDocSize

▸ **getDocSize**(): `Object`

获取文档的尺寸

此方法用于获取整个文档的宽度和高度。
它会计算文档的最大滚动宽度和高度，包括可能被隐藏的溢出内容。

#### Returns

`Object`

包含文档宽度和高度的对象

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

src/dom/window.ts:105

___

### getOffset

▸ **getOffset**(`node`, `stopNode?`): `Object`

获取元素相对于文档或指定父容器的偏移量

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `HTMLElement` | 要计算偏移量的目标元素 |
| `stopNode?` | `HTMLElement` | 停止计算的父节点（可选） |

#### Returns

`Object`

包含元素左侧和顶部偏移量的对象

| Name | Type |
| :------ | :------ |
| `left` | `number` |
| `top` | `number` |

#### Defined in

src/dom/window.ts:45

___

### getOffsetDistance

▸ **getOffsetDistance**(`el1`, `el2`): `Object`

计算两个 HTML 元素之间的相对偏移距离

此方法用于计算两个 HTML 元素之间的水平和垂直距离。
它会分别计算两个元素相对于文档的偏移量，然后计算它们之间的差值。

**`Example`**

```ts
const distance = getOffsetDistance(element1, element2);
console.log(distance);
>>> { left: 100, top: 50 } // element2 在 element1 右侧100px，下方50px
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el1` | `HTMLElement` | 第一个 HTML 元素，作为参考点 |
| `el2` | `HTMLElement` | 第二个 HTML 元素，要计算相对于第一个元素的偏移距离 |

#### Returns

`Object`

包含水平和垂直偏移距离的对象

| Name | Type |
| :------ | :------ |
| `left` | `number` |
| `top` | `number` |

#### Defined in

src/dom/window.ts:88

___

### getOuterHeight

▸ **getOuterHeight**(`el`): `number`

获取元素的外部高度

此方法用于计算指定元素的外部高度。如果元素是文档的 body，
则返回视口的高度；否则返回元素的偏移高度。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `HTMLElement` | 要计算高度的目标元素 |

#### Returns

`number`

元素的外部高度

#### Defined in

src/dom/window.ts:163

___

### getScroll

▸ **getScroll**(): `Object`

获取当前页面的滚动位置

此方法用于获取当前页面的水平和垂直滚动位置。
它会返回一个包含 scrollLeft 和 scrollTop 属性的对象，
这两个属性分别表示水平和垂直方向上的滚动距离。

#### Returns

`Object`

包含滚动位置的对象

| Name | Type |
| :------ | :------ |
| `scrollLeft` | `number` |
| `scrollTop` | `number` |

#### Defined in

src/dom/window.ts:31

___

### getViewportSize

▸ **getViewportSize**(): `Object`

获取视口（viewport）的尺寸

此方法用于获取浏览器视口的宽度和高度。它会考虑以下情况:
1. 如果 body 和 documentElement 都有有效的 clientHeight/clientWidth，
   取两者中的较小值作为视口尺寸
2. 如果其中一个值无效，则取两者中的较大值

这样处理是为了兼容不同浏览器的实现差异。

**`Example`**

```ts
const viewport = getViewportSize();
console.log(viewport);
>>> { width: 1024, height: 768 }
```

#### Returns

`Object`

包含视口宽度和高度的对象

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

src/dom/window.ts:132
