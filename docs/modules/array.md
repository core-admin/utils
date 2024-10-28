[@hubxu/utils](../README.md) / [Exports](../modules.md) / array

# Module: array

## Table of contents

### Functions

- [allDistinct](array.md#alldistinct)
- [alphabeticalSort](array.md#alphabeticalsort)
- [averageArray](array.md#averagearray)
- [hasDuplicates](array.md#hasduplicates)
- [makeUniqueElementsBy](array.md#makeuniqueelementsby)
- [makeUniqueElementsBy2](array.md#makeuniqueelementsby2)
- [maxBy](array.md#maxby)
- [maxN](array.md#maxn)
- [medianArray](array.md#medianarray)
- [minBy](array.md#minby)
- [minN](array.md#minn)
- [orderBy](array.md#orderby)
- [productArray](array.md#productarray)
- [quickSort](array.md#quicksort)
- [removeNonUnique](array.md#removenonunique)
- [removeNonUniqueBy](array.md#removenonuniqueby)
- [removeUnique](array.md#removeunique)
- [sampleArrayItem](array.md#samplearrayitem)
- [shuffle](array.md#shuffle)
- [sumArray](array.md#sumarray)
- [uniqueElementsBy](array.md#uniqueelementsby)
- [uniquePrimitiveElements](array.md#uniqueprimitiveelements)

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

src/array/index.ts:20

___

### alphabeticalSort

▸ **alphabeticalSort**<`T`\>(`arr`, `getter`, `order?`): `T`[]

根据属性按照字母顺序对对象数组进行排序（默认为升序）

**`Description`**

此方法对给定的对象数组进行排序，根据指定的属性值进行字母顺序排序。
可以选择升序或降序排序，默认为升序。

**`Example`**

```ts
const users = [
  { name: '张三', age: 30 },
  { name: '李四', age: 25 },
  { name: '王五', age: 35 }
];
const sortedUsers = alphabeticalSort(users, user => user.name);
结果: [{ name: '李四', age: 25 }, { name: '王五', age: 35 }, { name: '张三', age: 30 }]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | 数组元素的类型 |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` | 要排序的对象数组 |
| `getter` | (`i`: `T`) => `string` | `undefined` | 用于获取排序属性值的函数 |
| `order?` | ``"desc"`` \| ``"asc"`` | `'asc'` | 排序顺序，'asc' 为升序，'desc' 为降序 |

#### Returns

`T`[]

返回排序后的新数组

#### Defined in

src/array/index.ts:198

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

src/array/index.ts:325

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

src/array/index.ts:13

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

src/array/index.ts:132

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

src/array/index.ts:164

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

src/array/index.ts:307

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

src/array/index.ts:278

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

src/array/index.ts:332

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

src/array/index.ts:311

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

src/array/index.ts:293

___

### orderBy

▸ **orderBy**<`T`\>(`arr`, `props`, `orders?`): `T`[]

对对象数组进行排序，按照指定属性进行排序（默认为升序）。
经常场景就是 SQL 查询，可以按多列排序并指定每列的顺序。
orders 默认值为升序。0 也将被视为升序。

**`Other`**

https://www.30secondsofcode.org/js/s/sort-array-of-objects/#sort-an-array-of-objects-ordered-by-a-property-order

**`Example`**

```ts
const users = [ { name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
orderBy(users, ['name', 'age'], [1, -1]); // [{ name: "barney", age: 36, }, { name: "fred", age: 48 }, { name: "fred", age: 40}]

先根据用户的 name 属性进行升序排序，如果 name 相同，则根据 age 属性进行降序排序；
barney, 36（因为 barney 在字母顺序上排在 fred 之前），fred, 48（因为在所有名为 fred 的条目中，按照 age 降序，48 大于 40），fred 40。
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `props` | keyof `T`[] |
| `orders?` | (``1`` \| ``-1``)[] |

#### Returns

`T`[]

#### Defined in

src/array/index.ts:224

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

src/array/index.ts:341

___

### quickSort

▸ **quickSort**<`T`\>(`arr`): `T`[]

快速排序是一种分而治之的排序算法。
它的基本思想是选择一个“基准”元素，然后将数组分为两部分，一部分包括所有小于基准的元素，另一部分包括所有大于基准的元素。
这个过程称为分区（partitioning）。然后，递归地在两个子数组上重复这个过程，直到整个数组排序完成。

对于处理大型数据集，快速排序通常是最快的排序算法之一（需要高效排序算法的场景）。
该算法的平均时间复杂度为O(n log n)。

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

src/array/index.ts:248

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

src/array/index.ts:29

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

src/array/index.ts:69

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

src/array/index.ts:38

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

src/array/index.ts:348

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

src/array/index.ts:355

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

src/array/index.ts:318

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

src/array/index.ts:101

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

src/array/index.ts:6
