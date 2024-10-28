[@hubxu/utils](../README.md) / [Exports](../modules.md) / object

# Module: object

## Table of contents

### Functions

- [entriesOf](object.md#entriesof)
- [getProp](object.md#getprop)
- [keysOf](object.md#keysof)

## Functions

### entriesOf

▸ **entriesOf**<`T`\>(`arr`): `Entries`<`T`\>

返回对象的键值对数组

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `object` | 对象类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T` | 输入对象 |

#### Returns

`Entries`<`T`\>

对象的键值对数组

#### Defined in

[src/object/index.ts:19](https://github.com/core-admin/utils/blob/48a655a/src/object/index.ts#L19)

___

### getProp

▸ **getProp**<`T`\>(`obj`, `path`, `defaultValue?`): `Object`

获取对象指定路径的属性值

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | 返回值类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Record`<`string`, `any`\> | 输入对象 |
| `path` | [`Arrayable`](typing.md#arrayable)<`string`\> | 属性路径 |
| `defaultValue?` | `any` | 默认值 |

#### Returns

`Object`

包含getter和setter的对象

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

[src/object/index.ts:29](https://github.com/core-admin/utils/blob/48a655a/src/object/index.ts#L29)

___

### keysOf

▸ **keysOf**<`T`\>(`arr`): keyof `T`[]

返回对象的键数组

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `object` | 对象类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T` | 输入对象 |

#### Returns

keyof `T`[]

对象的键数组

#### Defined in

[src/object/index.ts:11](https://github.com/core-admin/utils/blob/48a655a/src/object/index.ts#L11)
