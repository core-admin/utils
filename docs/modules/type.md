[@hubxu/utils](../README.md) / [Exports](../modules.md) / type

# Module: type

## Table of contents

### Variables

- [isClient](type.md#isclient)
- [isServer](type.md#isserver)

### Functions

- [is](type.md#is)
- [isArray](type.md#isarray)
- [isBigInt](type.md#isbigint)
- [isBoolean](type.md#isboolean)
- [isDate](type.md#isdate)
- [isDef](type.md#isdef)
- [isElement](type.md#iselement)
- [isEmpty](type.md#isempty)
- [isFirefox](type.md#isfirefox)
- [isFunction](type.md#isfunction)
- [isIOS](type.md#isios)
- [isMobile](type.md#ismobile)
- [isNull](type.md#isnull)
- [isNumber](type.md#isnumber)
- [isObject](type.md#isobject)
- [isPromise](type.md#ispromise)
- [isRegExp](type.md#isregexp)
- [isSameValue](type.md#issamevalue)
- [isString](type.md#isstring)
- [isStringNumber](type.md#isstringnumber)
- [isSymbol](type.md#issymbol)
- [isUndefined](type.md#isundefined)

## Variables

### isClient

• `Const` **isClient**: `boolean`

是否为浏览器环境

#### Defined in

[src/type.ts:152](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L152)

___

### isServer

• `Const` **isServer**: `boolean` = `!isClient`

是否为服务器环境

#### Defined in

[src/type.ts:155](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L155)

## Functions

### is

▸ **is**(`value`, `type`): `boolean`

判断值是否为指定类型

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |
| `type` | `string` | 类型字符串 |

#### Returns

`boolean`

#### Defined in

[src/type.ts:9](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L9)

___

### isArray

▸ **isArray**(`arg`): arg is any[]

Array.isArray 的别名

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `any` |

#### Returns

arg is any[]

#### Defined in

node_modules/.pnpm/typescript@5.6.3/node_modules/typescript/lib/lib.es5.d.ts:1513

___

### isBigInt

▸ **isBigInt**(`value`): value is bigint

判断值是否为BigInt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is bigint

#### Defined in

[src/type.ts:95](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L95)

___

### isBoolean

▸ **isBoolean**(`value`): value is boolean

判断值是否为布尔值

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is boolean

#### Defined in

[src/type.ts:55](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L55)

___

### isDate

▸ **isDate**(`value`): value is Date

判断值是否为Date对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is Date

#### Defined in

[src/type.ts:103](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L103)

___

### isDef

▸ **isDef**<`T`\>(`val`): val is NonNullable<T\>

判断值是否已定义且非null

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `T` |

#### Returns

val is NonNullable<T\>

#### Defined in

[src/type.ts:149](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L149)

___

### isElement

▸ **isElement**(`value`): value is Element

判断值是否为DOM元素

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is Element

#### Defined in

[src/type.ts:131](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L131)

___

### isEmpty

▸ **isEmpty**(`value`): `boolean`

判断值是否为空

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

`boolean`

#### Defined in

[src/type.ts:140](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L140)

___

### isFirefox

▸ **isFirefox**(): `boolean`

是否为Firefox浏览器

#### Returns

`boolean`

#### Defined in

[src/type.ts:158](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L158)

___

### isFunction

▸ **isFunction**(`value`): value is Function

判断值是否为函数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is Function

#### Defined in

[src/type.ts:63](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L63)

___

### isIOS

▸ **isIOS**(): `boolean`

是否为iOS设备

#### Returns

`boolean`

#### Defined in

[src/type.ts:161](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L161)

___

### isMobile

▸ **isMobile**(): `boolean`

判断是否为移动设备

#### Returns

`boolean`

#### Defined in

[src/type.ts:173](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L173)

___

### isNull

▸ **isNull**(`value`): value is null

判断值是否为null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is null

#### Defined in

[src/type.ts:71](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L71)

___

### isNumber

▸ **isNumber**(`value`): value is number

判断值是否为数字

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is number

#### Defined in

[src/type.ts:36](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L36)

___

### isObject

▸ **isObject**(`value`): value is Record<any, any\>

判断值是否为对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is Record<any, any\>

#### Defined in

[src/type.ts:20](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L20)

___

### isPromise

▸ **isPromise**(`value`): value is Promise<unknown\>

判断值是否为Promise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is Promise<unknown\>

#### Defined in

[src/type.ts:119](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L119)

___

### isRegExp

▸ **isRegExp**(`value`): value is RegExp

判断值是否为正则表达式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is RegExp

#### Defined in

[src/type.ts:111](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L111)

___

### isSameValue

▸ **isSameValue**(`newValue`, `oldValue`): `boolean`

判断两个值是否相等

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValue` | `unknown` | 新值 |
| `oldValue` | `unknown` | 旧值 |

#### Returns

`boolean`

#### Defined in

[src/type.ts:169](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L169)

___

### isString

▸ **isString**(`value`): value is string

判断值是否为字符串

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is string

#### Defined in

[src/type.ts:28](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L28)

___

### isStringNumber

▸ **isStringNumber**(`value`): `boolean`

判断字符串是否可转为数字

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

`boolean`

#### Defined in

[src/type.ts:44](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L44)

___

### isSymbol

▸ **isSymbol**(`value`): value is symbol

判断值是否为Symbol

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is symbol

#### Defined in

[src/type.ts:87](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L87)

___

### isUndefined

▸ **isUndefined**(`value`): value is undefined

判断值是否为undefined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | 要判断的值 |

#### Returns

value is undefined

#### Defined in

[src/type.ts:79](https://github.com/core-admin/utils/blob/48a655a/src/type.ts#L79)
