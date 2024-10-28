[@hubxu/utils](../README.md) / [Exports](../modules.md) / helper

# Module: helper

## Table of contents

### Functions

- [sleep](helper.md#sleep)
- [swap](helper.md#swap)

## Functions

### sleep

▸ **sleep**(`time?`): `Promise`<`void`\>

延迟执行一段时间

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `time` | `number` | `0` | 延迟的时间(毫秒)，默认为0 |

#### Returns

`Promise`<`void`\>

返回一个Promise对象,在指定时间后resolve

#### Defined in

[src/helper.ts:18](https://github.com/core-admin/utils/blob/48a655a/src/helper.ts#L18)

___

### swap

▸ **swap**<`T`\>(`chars`, `i`, `j`): `void`

交换数组中两个元素的位置

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chars` | `T`[] | 需要进行操作的数组 |
| `i` | `number` | 第一个元素的索引 |
| `j` | `number` | 第二个元素的索引 |

#### Returns

`void`

#### Defined in

[src/helper.ts:7](https://github.com/core-admin/utils/blob/48a655a/src/helper.ts#L7)
