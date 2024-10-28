[@hubxu/utils](../README.md) / [Exports](../modules.md) / array/filter

# Module: array/filter

## Table of contents

### Functions

- [asymmetricDifferenceArrayBase](array_filter.md#asymmetricdifferencearraybase)
- [asymmetricDifferenceArrayObject](array_filter.md#asymmetricdifferencearrayobject)
- [differenceArrayBase](array_filter.md#differencearraybase)
- [differenceArrayObject](array_filter.md#differencearrayobject)
- [intersectionArrayBase](array_filter.md#intersectionarraybase)
- [intersectionArrayObject](array_filter.md#intersectionarrayobject)
- [symmetricDifferenceArrayBase](array_filter.md#symmetricdifferencearraybase)
- [symmetricDifferenceArrayObject](array_filter.md#symmetricdifferencearrayobject)
- [unionArrayBase](array_filter.md#unionarraybase)
- [unionArrayObject](array_filter.md#unionarrayobject)

## Functions

### asymmetricDifferenceArrayBase

▸ **asymmetricDifferenceArrayBase**<`T`\>(`arr1`, `arr2`): `T`[]

查找两个数组的非对称差集
非对称差集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组
与补集的概念相同，但为了命名的一致性而提供
例如: [1,2,3] 和 [2,3,4] 的非对称差集是 [1]

**`Example`**

```ts
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
asymmetricDifferenceArrayBase(arr1, arr2) // [1, 2, 3]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组(主集) |
| `arr2` | `T`[] | 第二个数组(从主集中需要排除的元素集合) |

#### Returns

`T`[]

两个数组的非对称差集

#### Defined in

src/array/filter.ts:234

___

### asymmetricDifferenceArrayObject

▸ **asymmetricDifferenceArrayObject**<`T`\>(`arr1`, `arr2`, `keyOrCompare`): `T`[]

查找两个对象数组的非对称差集
非对称差集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组

**`Example`**

```ts
// 使用key比较
const arr1 = [{id: 1}, {id: 2}];
const arr2 = [{id: 2}, {id: 3}];
asymmetricDifferenceArrayObject(arr1, arr2, 'id') // [{id: 1}]

// 使用自定义比较函数
asymmetricDifferenceArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组(主集) |
| `arr2` | `T`[] | 第二个数组(从主集中需要排除的元素集合) |
| `keyOrCompare` | keyof `T` \| `CompareFunction`<`T`\> | 用于比较的对象属性键名或比较函数 |

#### Returns

`T`[]

两个数组的非对称差集

#### Defined in

src/array/filter.ts:257

___

### differenceArrayBase

▸ **differenceArrayBase**<`T`\>(`arr1`, `arr2`): `T`[]

查找两个数组的补集
补集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组
例如: [1,2,3] 和 [2,3,4] 的补集是 [1]

**`Example`**

```ts
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
differenceArrayBase(arr1, arr2) // [1, 2, 3]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组(主集) |
| `arr2` | `T`[] | 第二个数组(从主集中需要排除的元素集合) |

#### Returns

`T`[]

两个数组的补集

#### Defined in

src/array/filter.ts:125

___

### differenceArrayObject

▸ **differenceArrayObject**<`T`\>(`arr1`, `arr2`, `keyOrCompare`): `T`[]

查找两个对象数组的对称差集
对称差集是指两个数组中不共同存在的元素组成的新数组

**`Example`**

```ts
// 使用key比较
const arr1 = [{id: 1}, {id: 2}];
const arr2 = [{id: 2}, {id: 3}];
differenceArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 3}]

// 使用自定义比较函数
differenceArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}, {id: 3}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |
| `keyOrCompare` | `CompareFunction`<`T`\> \| keyof `T` | 用于比较的对象属性键名或比较函数 |

#### Returns

`T`[]

两个数组的对称差集

#### Defined in

src/array/filter.ts:148

___

### intersectionArrayBase

▸ **intersectionArrayBase**<`T`\>(`arr1`, `arr2`): `T`[]

查找两个数组的交集
交集是指两个数组中共同存在的元素组成的新数组
例如: [1,2,3] 和 [2,3,4] 的交集是 [2,3]

**`Example`**

```ts
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
intersection(arr1, arr2) // [4, 5]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |

#### Returns

`T`[]

两个数组的交集

#### Defined in

src/array/filter.ts:15

___

### intersectionArrayObject

▸ **intersectionArrayObject**<`T`\>(`arr1`, `arr2`, `keyOrCompare`): `T`[]

查找两个对象数组的交集
交集是指两个数组中共同存在的元素组成的新数组

**`Example`**

```ts
// 使用key比较
const arr1 = [{id: 1}, {id: 2}];
const arr2 = [{id: 2}, {id: 3}];
intersectionArrayObject(arr1, arr2, 'id') // [{id: 2}]

// 使用自定义比较函数
intersectionArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 2}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |
| `keyOrCompare` | `CompareFunction`<`T`\> \| keyof `T` | 用于比较的对象属性键名或比较函数 |

#### Returns

`T`[]

两个数组的交集

#### Defined in

src/array/filter.ts:43

___

### symmetricDifferenceArrayBase

▸ **symmetricDifferenceArrayBase**<`T`\>(`arr1`, `arr2`): `T`[]

查找两个数组的对称差集
对称差集是指两个数组中不共同拥有的元素组成的新数组
换句话说，对称差集 = (A-B)∪(B-A)，即两个数组的并集减去交集
例如: [1,2,3] 和 [2,3,4] 的对称差集是 [1,4]

**`Example`**

```ts
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
symmetricDifferenceArrayBase(arr1, arr2) // [1, 2, 3, 6, 7, 8]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |

#### Returns

`T`[]

两个数组的对称差集

#### Defined in

src/array/filter.ts:181

___

### symmetricDifferenceArrayObject

▸ **symmetricDifferenceArrayObject**<`T`\>(`arr1`, `arr2`, `keyOrCompare`): `T`[]

查找两个对象数组的对称差集
对称差集是指两个数组中不共同拥有的元素组成的新数组

**`Example`**

```ts
const arr1 = [{id: 1}, {id: 2}];
const arr2 = [{id: 2}, {id: 3}];
symmetricDifferenceArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 3}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |
| `keyOrCompare` | `CompareFunction`<`T`\> \| keyof `T` | - |

#### Returns

`T`[]

两个数组的对称差集

#### Defined in

src/array/filter.ts:200

___

### unionArrayBase

▸ **unionArrayBase**<`T`\>(`arr1`, `arr2`): `T`[]

查找两个数组的并集
并集是指两个数组中所有不重复的元素组成的新数组
例如: [1,2,3] 和 [2,3,4] 的并集是 [1,2,3,4]

**`Example`**

```ts
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
unionArrayBase(arr1, arr2) // [1, 2, 3, 4, 5, 6, 7, 8]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |

#### Returns

`T`[]

两个数组的并集

#### Defined in

src/array/filter.ts:72

___

### unionArrayObject

▸ **unionArrayObject**<`T`\>(`arr1`, `arr2`, `keyOrCompare`): `T`[]

查找两个对象数组的并集
并集是指两个数组中所有不重复的元素组成的新数组

**`Example`**

```ts
// 使用key比较
const arr1 = [{id: 1}, {id: 2}];
const arr2 = [{id: 2}, {id: 3}];
unionArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 2}, {id: 3}]

// 使用自定义比较函数
unionArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}, {id: 2}, {id: 3}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr1` | `T`[] | 第一个数组 |
| `arr2` | `T`[] | 第二个数组 |
| `keyOrCompare` | `CompareFunction`<`T`\> \| keyof `T` | 用于比较的对象属性键名或比较函数 |

#### Returns

`T`[]

两个数组的并集

#### Defined in

src/array/filter.ts:95
