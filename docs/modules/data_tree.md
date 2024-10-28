[@hubxu/utils](../README.md) / [Exports](../modules.md) / data/tree

# Module: data/tree

## Table of contents

### Functions

- [buildTree](data_tree.md#buildtree)
- [findParentNodeIterative](data_tree.md#findparentnodeiterative)
- [findTreeNodeAndPathByIdIterative](data_tree.md#findtreenodeandpathbyiditerative)
- [findTreeNodeByKeyValueIterative](data_tree.md#findtreenodebykeyvalueiterative)
- [findTreeNodeIterative](data_tree.md#findtreenodeiterative)
- [removeEmptyChildrenIterative](data_tree.md#removeemptychildreniterative)

## Functions

### buildTree

▸ **buildTree**<`T`\>(`arr`, `options?`): `BuildTreeNode`<`T`\>[]

将扁平数据转换为树形结构

**`Export`**

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string` \| `number`, `any`\> | 扩展自 Record<string \| number, any> 的类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | 需要转换的扁平数据数组 |
| `options?` | `Object` | 可选的配置参数 |
| `options.parentKey?` | `string` | 对象父级的键，默认为 'pid' |
| `options.rootValue?` | `string` \| `number` | 根节点的值，默认为 0，pid = 0 的节点为根节点 |
| `options.selfKey?` | `string` | 对象自身的键，默认为 'id' |

#### Returns

`BuildTreeNode`<`T`\>[]

返回树形结构的数组

#### Defined in

src/data/tree.ts:37

___

### findParentNodeIterative

▸ **findParentNodeIterative**<`T`\>(`data`, `isParentCallback`): `T` \| ``null``

在树结构中迭代查找满足条件的节点的父节点

**`Description`**

该函数使用迭代方式遍历树结构，查找满足指定条件的节点的父节点。
适用于需要在大型树结构中快速定位特定节点的父节点的场景。

**`Example`**

```ts
const treeData = [
  { id: 1, children: [
    { id: 2, name: 'target' },
    { id: 3 }
  ]},
  { id: 4, children: [{ id: 5 }] }
];

const parentNode = findParentNodeIterative(treeData, node => node.name === 'target');
console.log(parentNode); // 输出: { id: 1, children: [...] }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T`[] | 树结构数据数组 |
| `isParentCallback` | (`node`: `T`) => `boolean` | 判断是否为目标节点的回调函数 |

#### Returns

`T` \| ``null``

返回满足条件的节点的父节点，如果未找到则返回null

#### Defined in

src/data/tree.ts:167

___

### findTreeNodeAndPathByIdIterative

▸ **findTreeNodeAndPathByIdIterative**<`T`\>(`data`, `id`): `FindTreeValueAndPathResult`<`T`\>

根据id查找树中的节点及路径

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `id` | `number` |

#### Returns

`FindTreeValueAndPathResult`<`T`\>

#### Defined in

src/data/tree.ts:74

___

### findTreeNodeByKeyValueIterative

▸ **findTreeNodeByKeyValueIterative**<`T`\>(`data`, `value`, `key?`): `T` \| ``null``

根据id查找树中的节点

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `T`[] | `undefined` |
| `value` | `string` \| `number` | `undefined` |
| `key` | `string` | `'id'` |

#### Returns

`T` \| ``null``

#### Defined in

src/data/tree.ts:98

___

### findTreeNodeIterative

▸ **findTreeNodeIterative**<`T`\>(`data`, `cb`): `T` \| ``null``

查找树中的节点，根据回调函数判断

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `cb` | (`node`: `T`) => `boolean` |

#### Returns

`T` \| ``null``

#### Defined in

src/data/tree.ts:123

___

### removeEmptyChildrenIterative

▸ **removeEmptyChildrenIterative**<`T`\>(`data`): `void`

删除树中的空children属性

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |

#### Returns

`void`

#### Defined in

src/data/tree.ts:4
