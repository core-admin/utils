[@hubxu/utils](../README.md) / [Exports](../modules.md) / typing

# Module: typing

## Table of contents

### Interfaces

- [CSSProperties](../interfaces/typing.CSSProperties.md)

### Type Aliases

- [AnyFunction](typing.md#anyfunction)
- [Arrayable](typing.md#arrayable)
- [Numeric](typing.md#numeric)
- [Recordable](typing.md#recordable)

## Type Aliases

### AnyFunction

Ƭ **AnyFunction**<`T`\>: (...`args`: `any`[]) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`...args`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

[src/typing.ts:13](https://github.com/core-admin/utils/blob/48a655a/src/typing.ts#L13)

___

### Arrayable

Ƭ **Arrayable**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/typing.ts:9](https://github.com/core-admin/utils/blob/48a655a/src/typing.ts#L9)

___

### Numeric

Ƭ **Numeric**: `number` \| `string`

#### Defined in

[src/typing.ts:11](https://github.com/core-admin/utils/blob/48a655a/src/typing.ts#L11)

___

### Recordable

Ƭ **Recordable**<`T`\>: `Record`<`string`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[src/typing.ts:3](https://github.com/core-admin/utils/blob/48a655a/src/typing.ts#L3)
