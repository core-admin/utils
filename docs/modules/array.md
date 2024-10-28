[@hubxu/utils](../README.md) / [Exports](../modules.md) / array

# Module: array

## Table of contents

### References

- [alphabeticalSort](array.md#alphabeticalsort)
- [asymmetricDifferenceArrayBase](array.md#asymmetricdifferencearraybase)
- [asymmetricDifferenceArrayObject](array.md#asymmetricdifferencearrayobject)
- [differenceArrayBase](array.md#differencearraybase)
- [differenceArrayObject](array.md#differencearrayobject)
- [intersectionArrayBase](array.md#intersectionarraybase)
- [intersectionArrayObject](array.md#intersectionarrayobject)
- [orderBy](array.md#orderby)
- [quickSort](array.md#quicksort)
- [symmetricDifferenceArrayBase](array.md#symmetricdifferencearraybase)
- [symmetricDifferenceArrayObject](array.md#symmetricdifferencearrayobject)
- [unionArrayBase](array.md#unionarraybase)
- [unionArrayObject](array.md#unionarrayobject)

### Functions

- [allDistinct](array.md#alldistinct)
- [averageArray](array.md#averagearray)
- [hasDuplicates](array.md#hasduplicates)
- [makeUniqueElementsBy](array.md#makeuniqueelementsby)
- [makeUniqueElementsBy2](array.md#makeuniqueelementsby2)
- [maxBy](array.md#maxby)
- [maxN](array.md#maxn)
- [medianArray](array.md#medianarray)
- [minBy](array.md#minby)
- [minN](array.md#minn)
- [productArray](array.md#productarray)
- [removeNonUnique](array.md#removenonunique)
- [removeNonUniqueBy](array.md#removenonuniqueby)
- [removeUnique](array.md#removeunique)
- [sampleArrayItem](array.md#samplearrayitem)
- [shuffle](array.md#shuffle)
- [sumArray](array.md#sumarray)
- [uniqueElementsBy](array.md#uniqueelementsby)
- [uniquePrimitiveElements](array.md#uniqueprimitiveelements)

## References

### alphabeticalSort

Re-exports [alphabeticalSort](array_order.md#alphabeticalsort)

___

### asymmetricDifferenceArrayBase

Re-exports [asymmetricDifferenceArrayBase](array_filter.md#asymmetricdifferencearraybase)

___

### asymmetricDifferenceArrayObject

Re-exports [asymmetricDifferenceArrayObject](array_filter.md#asymmetricdifferencearrayobject)

___

### differenceArrayBase

Re-exports [differenceArrayBase](array_filter.md#differencearraybase)

___

### differenceArrayObject

Re-exports [differenceArrayObject](array_filter.md#differencearrayobject)

___

### intersectionArrayBase

Re-exports [intersectionArrayBase](array_filter.md#intersectionarraybase)

___

### intersectionArrayObject

Re-exports [intersectionArrayObject](array_filter.md#intersectionarrayobject)

___

### orderBy

Re-exports [orderBy](array_order.md#orderby)

___

### quickSort

Re-exports [quickSort](array_order.md#quicksort)

___

### symmetricDifferenceArrayBase

Re-exports [symmetricDifferenceArrayBase](array_filter.md#symmetricdifferencearraybase)

___

### symmetricDifferenceArrayObject

Re-exports [symmetricDifferenceArrayObject](array_filter.md#symmetricdifferencearrayobject)

___

### unionArrayBase

Re-exports [unionArrayBase](array_filter.md#unionarraybase)

___

### unionArrayObject

Re-exports [unionArrayObject](array_filter.md#unionarrayobject)

## Functions

### allDistinct

▸ **allDistinct**<`T`\>(`arr`): `boolean`

检查数组中的所有项是否都是唯一的

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`boolean`

#### Defined in

[src/array/index.ts:22](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L22)

___

### averageArray

▸ **averageArray**(`arr`): `number`

计算平均值

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `number`[] |

#### Returns

`number`

#### Defined in

[src/array/index.ts:236](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L236)

___

### hasDuplicates

▸ **hasDuplicates**<`T`\>(`arr`): `boolean`

检查数组中是否有重复项

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`boolean`

#### Defined in

[src/array/index.ts:15](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L15)

___

### makeUniqueElementsBy

▸ **makeUniqueElementsBy**<`T`\>(`arr`, `fn`): `T`[]

对数组进行去重操作，适用于数组长度较大的情况。

**`Description`**

此方法使用 Map 数据结构来提高大型数组的去重效率。它通过一个键生成函数来判断元素的唯一性，
保留每个唯一键的第一个出现的元素。

**`Example`**

```ts
const arr = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 1, name: '张三（重复）' },
  { id: 3, name: '王五' }
];
const uniqueArr = makeUniqueElementsBy(arr, item => item.id);
结果: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | 需要去重的数组 |
| `fn` | (`item`: `T`) => `any` | 用于生成唯一键的函数 |

#### Returns

`T`[]

返回去重后的新数组

#### Defined in

[src/array/index.ts:134](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L134)

___

### makeUniqueElementsBy2

▸ **makeUniqueElementsBy2**<`T`, `U`\>(`arr`, `compareValues`, `fn`): `T`[]

根据比较函数和比较值数组过滤数组元素。

**`Description`**

此方法遍历原数组，对每个元素应用比较函数。如果比较函数对任何比较值返回 true，
则该元素将被从结果数组中排除。这种方法允许基于多个条件进行复杂的数组过滤。

**`Example`**

```ts
const numbers = [1, 2, 3, 4, 5];
const compareValues = [2, 4];
const result = makeUniqueElementsBy2(numbers, compareValues, (num, compare) => num % compare === 0);
结果: [1, 3, 5] // 删除了能被 2 或 4 整除的数
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 原数组元素的类型 |
| `U` | 比较值的类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | 要过滤的原数组 |
| `compareValues` | `U`[] | 用于比较的值数组 |
| `fn` | (`item`: `T`, `compareValue`: `U`) => `boolean` | 比较函数，接受一个数组元素和一个比较值，返回布尔值 |

#### Returns

`T`[]

返回过滤后的新数组

#### Defined in

[src/array/index.ts:166](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L166)

___

### maxBy

▸ **maxBy**<`T`\>(`arr`, `select`): `number`

根据函数返回的值查找数组的最大值和最小值

**`Example`**

```ts
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8

minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `select` | (`i`: `T`) => `any` \| keyof `T` |

#### Returns

`number`

#### Defined in

[src/array/index.ts:218](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L218)

___

### maxN

▸ **maxN**<`T`\>(`arr`, `n?`): `T`[]

查询数组的N个最大值

**`Example`**

```ts
maxN([1, 3, 2, 5, 4], 2); // 返回 [5, 4]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` | 输入数组 |
| `n?` | `number` | `1` | 要返回的最大值的数量，默认为1 |

#### Returns

`T`[]

包含N个最大值的数组

#### Defined in

[src/array/index.ts:189](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L189)

___

### medianArray

▸ **medianArray**(`arr`): `number`

计算中位数

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `number`[] |

#### Returns

`number`

#### Defined in

[src/array/index.ts:243](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L243)

___

### minBy

▸ **minBy**<`T`\>(`arr`, `select`): `number`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `select` | (`i`: `T`) => `any` \| keyof `T` |

#### Returns

`number`

#### Defined in

[src/array/index.ts:222](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L222)

___

### minN

▸ **minN**<`T`\>(`arr`, `n?`): `T`[]

查询数组的N个最小值

**`Example`**

```ts
minN([1, 3, 2, 5, 4], 2); // 返回 [1, 2]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` | 输入数组 |
| `n?` | `number` | `1` | 要返回的最小值的数量，默认为1 |

#### Returns

`T`[]

包含N个最小值的数组

#### Defined in

[src/array/index.ts:204](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L204)

___

### productArray

▸ **productArray**(`arr`): `number`

计算乘积

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `number`[] |

#### Returns

`number`

#### Defined in

[src/array/index.ts:252](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L252)

___

### removeNonUnique

▸ **removeNonUnique**<`T`\>(`arr`): `T`[]

删除出现多次的数组项。
出现多次的元素必须出现在至少两个不同的索引中。

**`Example`**

```ts
removeNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

#### Defined in

[src/array/index.ts:31](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L31)

___

### removeNonUniqueBy

▸ **removeNonUniqueBy**<`T`\>(`arr`, `fn`): `T`[]

删除非唯一项，只保留数组中出现过一次的项。

**`Description`**

此方法用于从数组中删除非唯一项，只保留那些在数组中仅出现一次的元素。
它使用一个自定义的比较函数来判断元素是否唯一。

**`Example`**

```ts
const arr = [1, 2, 2, 3, 4, 4, 5];
const result = removeNonUniqueBy(arr, (a, b) => a === b);
console.log(result); // [1, 3, 5]
```

**`Example`**

```ts
const objArr = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 1, name: '王五' },
  { id: 3, name: '赵六' }
];
const result = removeNonUniqueBy(objArr, (a, b) => a.id === b.id);
console.log(result); // [{ id: 2, name: '李四' }, { id: 3, name: '赵六' }]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | 需要处理的数组 |
| `fn` | (`a`: `T`, `b`: `T`, `indexA`: `number`, `indexB`: `number`) => `boolean` | 比较函数 |

#### Returns

`T`[]

返回只包含唯一项的新数组

#### Defined in

[src/array/index.ts:71](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L71)

___

### removeUnique

▸ **removeUnique**<`T`\>(`arr`): `T`[]

删除所有只出现一次的值（removeNonUnique 相反操作）。
删除所有只出现一次的值。在这种情况下，两个索引必须相同。

**`Example`**

```ts
removeUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

#### Defined in

[src/array/index.ts:40](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L40)

___

### sampleArrayItem

▸ **sampleArrayItem**<`T`\>(`arr`): `T`

从数组中随机获取一个元素

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`

#### Defined in

[src/array/index.ts:259](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L259)

___

### shuffle

▸ **shuffle**<`T`\>(`arr`, `inplace?`): `T`[]

洗牌函数 ”Fisher-Yates 洗牌算法“（随机排列数组）

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` |
| `inplace` | `boolean` | `true` |

#### Returns

`T`[]

#### Defined in

[src/array/index.ts:266](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L266)

___

### sumArray

▸ **sumArray**(`arr`): `number`

计算总和

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `number`[] |

#### Returns

`number`

#### Defined in

[src/array/index.ts:229](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L229)

___

### uniqueElementsBy

▸ **uniqueElementsBy**<`T`\>(`arr`, `fn`): `T`[]

使用比较函数来查找是否存在重复项（去重）。
更复杂的数据（例如对象）无法使用相等比较来进行比较，因此我们需要使用函数来检查重复项。

**`Description`**

此方法用于对复杂数据类型的数组进行去重操作。它接受一个数组和一个比较函数作为参数，
通过比较函数来判断两个元素是否相同，从而实现去重。

**`Example`**

```ts
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Charlie' }
];
const uniqueArr = uniqueElementsBy(arr, (a, b) => a.id === b.id);
结果: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | 需要去重的数组 |
| `fn` | `ComparatorFn`<`T`\> | 用于比较两个元素是否相同的函数 |

#### Returns

`T`[]

返回去重后的新数组

#### Defined in

[src/array/index.ts:103](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L103)

___

### uniquePrimitiveElements

▸ **uniquePrimitiveElements**<`T`\>(`arr`): `T`[]

获取数组中的唯一值（数组去重，但仅适用于基础数据类型）

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

#### Defined in

[src/array/index.ts:8](https://github.com/core-admin/utils/blob/48a655a/src/array/index.ts#L8)
