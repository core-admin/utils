[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/contains

# Module: dom/contains

## Table of contents

### Functions

- [contains](dom_contains.md#contains)

## Functions

### contains

▸ **contains**(`root`, `n?`): `boolean`

检查一个节点是否包含另一个节点

此方法用于判断给定的根节点是否包含指定的子节点。它首先检查根节点是否存在，
然后尝试使用原生的 contains 方法（如果可用）来进行判断。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | `undefined` \| ``null`` \| `Node` | 要检查的根节点 |
| `n?` | `Node` | 可能被包含的子节点 |

#### Returns

`boolean`

如果根节点包含子节点，则返回 true；否则返回 false

#### Defined in

src/dom/contains.ts:11
