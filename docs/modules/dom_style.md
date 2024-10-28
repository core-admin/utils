[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/style

# Module: dom/style

## Table of contents

### Functions

- [addClass](dom_style.md#addclass)
- [classNameToArray](dom_style.md#classnametoarray)
- [getCssVariableValue](dom_style.md#getcssvariablevalue)
- [getStyle](dom_style.md#getstyle)
- [hackCss](dom_style.md#hackcss)
- [hasClass](dom_style.md#hasclass)
- [removeClass](dom_style.md#removeclass)
- [removeStyle](dom_style.md#removestyle)
- [setCssVariableValue](dom_style.md#setcssvariablevalue)
- [setStyle](dom_style.md#setstyle)
- [styleObjectToString](dom_style.md#styleobjecttostring)
- [styleToString](dom_style.md#styletostring)

## Functions

### addClass

▸ **addClass**(`el`, `cls`): `void`

为元素添加类名

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `Element` | 要添加类名的元素 |
| `cls` | `string` | 要添加的类名，多个类名用空格分隔 |

#### Returns

`void`

#### Defined in

src/dom/style.ts:30

___

### classNameToArray

▸ **classNameToArray**(`className`): `string`[]

将类名字符串转换为类名数组

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `className` | `string` | 要转换的类名字符串，多个类名用空格分隔 |

#### Returns

`string`[]

转换后的类名数组，过滤掉空白类名

#### Defined in

src/dom/style.ts:137

___

### getCssVariableValue

▸ **getCssVariableValue**(`key`, `el?`): `string`

获取CSS变量的值

**`Throws`**

如果找不到指定的元素或选择器

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | CSS变量名，可以带有或不带有前缀'--' |
| `el?` | `string` \| `HTMLElement` | `':root'` | 要获取CSS变量的元素或CSS选择器，默认为':root' |

#### Returns

`string`

CSS变量的值

#### Defined in

src/dom/style.ts:101

___

### getStyle

▸ **getStyle**(`element`, `styleName`): `string`

获取指定HTML元素的特定样式属性值

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要获取样式的HTML元素 |
| `styleName` | keyof [`CSSProperties`](../interfaces/typing.CSSProperties.md) | 要获取的CSS属性名 |

#### Returns

`string`

指定样式属性的值，如果无法获取则返回空字符串

#### Defined in

src/dom/style.ts:147

___

### hackCss

▸ **hackCss**(`attr`, `value`): `any`

生成带有浏览器前缀的CSS属性对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attr` | `string` | CSS属性名 |
| `value` | `string` | CSS属性值 |

#### Returns

`any`

包含带前缀和不带前缀的CSS属性的对象

#### Defined in

src/dom/style.ts:81

___

### hasClass

▸ **hasClass**(`el`, `cls`): `boolean`

检查元素是否包含指定的类名

**`Throws`**

如果类名包含空格则抛出错误

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `Element` | 要检查的元素 |
| `cls` | `string` | 要检查的类名 |

#### Returns

`boolean`

如果元素包含指定类名则返回true，否则返回false

#### Defined in

src/dom/style.ts:15

___

### removeClass

▸ **removeClass**(`el`, `cls`): `void`

从元素中移除类名

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `Element` | 要移除类名的元素 |
| `cls` | `string` | 要移除的类名，多个类名用空格分隔 |

#### Returns

`void`

#### Defined in

src/dom/style.ts:55

___

### removeStyle

▸ **removeStyle**(`element`, `style`): `void`

移除HTML元素的指定样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要移除样式的HTML元素 |
| `style` | keyof [`CSSProperties`](../interfaces/typing.CSSProperties.md) | 要移除的样式名称或样式对象 |

#### Returns

`void`

#### Defined in

src/dom/style.ts:197

___

### setCssVariableValue

▸ **setCssVariableValue**<`T`\>(`key`, `value`, `el?`): `void`

设置CSS变量的值

**`Throws`**

如果找不到指定的元素或选择器

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `T` | `undefined` | CSS变量名，可以带有或不带有前缀'--' |
| `value` | `string` | `undefined` | 要设置的CSS变量值 |
| `el?` | `string` \| `HTMLElement` | `':root'` | 要设置CSS变量的元素或CSS选择器，默认为':root' |

#### Returns

`void`

#### Defined in

src/dom/style.ts:120

___

### setStyle

▸ **setStyle**(`element`, `styleName`, `value?`): `void`

设置HTML元素的样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要设置样式的HTML元素 |
| `styleName` | [`CSSProperties`](../interfaces/typing.CSSProperties.md) \| keyof [`CSSProperties`](../interfaces/typing.CSSProperties.md) | 要设置的样式名称或样式对象 |
| `value?` | `string` \| `Number` | 当styleName为字符串时，表示要设置的样式值 |

#### Returns

`void`

#### Defined in

src/dom/style.ts:174

___

### styleObjectToString

▸ **styleObjectToString**(`style`): `string`

将样式对象转换为CSS样式字符串

此方法用于将JavaScript样式对象转换为格式化的CSS样式字符串。
它会忽略值为undefined或null的属性。

**`Example`**

```ts
const styleObject = { color: 'red', fontSize: '16px', margin: '10px' };
const styleString = styleObjectToString(styleObject);
>>> color: red; font-size: 16px; margin: 10px;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Record`<`string`, `string`\> | 要转换的样式对象 |

#### Returns

`string`

格式化的CSS样式字符串

#### Defined in

src/dom/style.ts:249

___

### styleToString

▸ **styleToString**(`style`): `string`

将CSSStyleDeclaration对象转换为样式字符串

此方法用于处理Firefox和Chrome之间的行为差异，
将给定的CSSStyleDeclaration对象转换为一个格式化的CSS样式字符串。

**`Example`**

```ts
const element = document.getElementById('myElement');
const computedStyle = window.getComputedStyle(element);
const styleString = styleToString(computedStyle);
>>> color: rgb(0, 0, 0); font-size: 16px; margin: 10px; padding: 5px; ...

2：
const div = document.createElement('div');
div.style.color = 'red';
const inlineStyleString = styleToString(div.style);
>>> color: red;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `CSSStyleDeclaration` | 要转换的CSSStyleDeclaration对象 |

#### Returns

`string`

格式化的CSS样式字符串

#### Defined in

src/dom/style.ts:228
