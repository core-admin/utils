[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/find-dom

# Module: dom/find-dom

## Table of contents

### Functions

- [getAncestors](dom_find_dom.md#getancestors)
- [getParentsUntil](dom_find_dom.md#getparentsuntil)
- [getPopupContainer](dom_find_dom.md#getpopupcontainer)
- [getSiblingByPosition](dom_find_dom.md#getsiblingbyposition)

## Functions

### getAncestors

▸ **getAncestors**(`el`): `Element`[]

获取元素的所有祖先元素

**`Description`**

从当前元素开始向上遍历DOM树，获取所有的祖先元素

**`Example`**

```ts
获取 div 元素的所有祖先元素
getAncestors(divElement)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `Element` | 起始元素 |

#### Returns

`Element`[]

返回所有祖先元素的数组，从最近的父元素到最远的祖先元素(document)

#### Defined in

src/dom/find-dom.ts:43

___

### getParentsUntil

▸ **getParentsUntil**(`el`, `selector`): `Element`[]

根据选择器查询父元素，并返回查询到的所有父元素

**`Description`**

从当前元素开始向上查找父元素，直到找到匹配选择器的元素为止，返回查找过程中的所有父元素

**`Example`**

```ts
查找 div 元素的所有父元素，直到找到 class 为 container 的元素
getParentsUntil(divElement, '.container')
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `Element` | 起始元素 |
| `selector` | `string` | CSS选择器 |

#### Returns

`Element`[]

返回查找到的所有父元素数组，如果没有找到匹配的父元素则返回空数组

#### Defined in

src/dom/find-dom.ts:22

___

### getPopupContainer

▸ **getPopupContainer**(`node?`): `HTMLElement`

获取弹出框的容器元素

**`Description`**

返回指定节点的父元素作为容器，如果没有指定节点或父元素，则返回 document.body

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node?` | `HTMLElement` | 指定的节点元素 |

#### Returns

`HTMLElement`

返回容器元素

#### Defined in

src/dom/find-dom.ts:7

___

### getSiblingByPosition

▸ **getSiblingByPosition**(`el`, `distance`, `elClass`): ``null`` \| `Element`

根据位置获取兄弟元素

**`Description`**

获取指定元素相对位置的兄弟元素，可以向前或向后查找

**`Example`**

```ts
获取当前元素后面第一个兄弟元素
getSiblingByPosition(element, 1, '.sibling-class')

获取当前元素前面第二个兄弟元素
getSiblingByPosition(element, -2, '.sibling-class')
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `HTMLElement` | 起始元素 |
| `distance` | `number` | 相对位置，正数表示向后查找，负数表示向前查找 |
| `elClass` | `string` | CSS选择器，用于筛选兄弟元素 |

#### Returns

``null`` \| `Element`

返回找到的兄弟元素，如果没有找到则返回 null

#### Defined in

src/dom/find-dom.ts:68
