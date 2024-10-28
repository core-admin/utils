[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/aria

# Module: dom/aria

## Table of contents

### Functions

- [attemptFocus](dom_aria.md#attemptfocus)
- [isFocusable](dom_aria.md#isfocusable)

## Functions

### attemptFocus

▸ **attemptFocus**(`element`): `boolean`

将焦点设置为当前节点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要聚焦的元素 |

#### Returns

`boolean`

如果元素被聚焦，则为 true。

#### Defined in

[src/dom/aria.ts:47](https://github.com/core-admin/utils/blob/48a655a/src/dom/aria.ts#L47)

___

### isFocusable

▸ **isFocusable**(`element`): `boolean`

确定目标元素是否可聚焦

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要聚焦的元素 |

#### Returns

`boolean`

如果元素可聚焦，则为 true。

#### Defined in

[src/dom/aria.ts:6](https://github.com/core-admin/utils/blob/48a655a/src/dom/aria.ts#L6)
