[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/format

# Module: dom/format

## Table of contents

### Functions

- [addUnit](dom_format.md#addunit)
- [formatStyleLength](dom_format.md#formatstylelength)
- [unitToPx](dom_format.md#unittopx)

## Functions

### addUnit

▸ **addUnit**(`value?`, `defaultUnit?`): `undefined` \| `string`

为给定的值添加单位。

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value?` | `string` \| `number` | `undefined` | 要添加单位的值。 |
| `defaultUnit?` | `string` | `'px'` | 默认添加的单位，默认为'px'。 |

#### Returns

`undefined` \| `string`

添加单位后的字符串，如果输入为空则返回空字符串。

#### Defined in

[src/dom/format.ts:64](https://github.com/core-admin/utils/blob/48a655a/src/dom/format.ts#L64)

___

### formatStyleLength

▸ **formatStyleLength**<`T`\>(`length`, `options?`): `T` extends ``null`` ? ``null`` : `T` extends `undefined` ? `undefined` : `T` extends `string` \| `number` ? `string` : `T`

格式化长度值。如果长度值是数字，它将被乘以一个系数并添加一个偏移量。如果长度值是字符串，它将尝试解析为数字进行同样的操作。如果无法解析为数字，它将尝试找到字符串中的数字并对其进行操作。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `T` | 要格式化的长度值，可以是数字、字符串、null或undefined。 |
| `options` | `FormatLengthOptions` | 格式化选项。 |

#### Returns

`T` extends ``null`` ? ``null`` : `T` extends `undefined` ? `undefined` : `T` extends `string` \| `number` ? `string` : `T`

格式化后的长度值。如果输入是数字或可以解析为数字的字符串，返回的将是字符串。否则，返回的将是输入的原始值。

#### Defined in

[src/dom/format.ts:25](https://github.com/core-admin/utils/blob/48a655a/src/dom/format.ts#L25)

___

### unitToPx

▸ **unitToPx**(`value`): `number`

将各种单位转换为像素值

**`Description`**

此方法用于将不同单位的值统一转换为像素值:
- 如果输入是数字,则直接返回
- 如果输入是字符串:
  - 包含rem单位,则转换为相对于根元素字体大小的像素值
  - 包含vw单位,则转换为相对于视口宽度的像素值  
  - 包含vh单位,则转换为相对于视口高度的像素值
  - 其他情况则解析为浮点数返回
注意:rem/vw/vh的转换只在客户端环境下进行

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Numeric`](typing.md#numeric) | 需要转换的值,可以是数字或包含单位(rem/vw/vh)的字符串 |

#### Returns

`number`

转换后的像素值

#### Defined in

[src/dom/format.ts:154](https://github.com/core-admin/utils/blob/48a655a/src/dom/format.ts#L154)
