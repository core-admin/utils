[@hubxu/utils](../README.md) / [Exports](../modules.md) / array/order

# Module: array/order

## Table of contents

### Functions

- [alphabeticalSort](array_order.md#alphabeticalsort)
- [orderBy](array_order.md#orderby)
- [quickSort](array_order.md#quicksort)

## Functions

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

src/array/order.ts:23

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

src/array/order.ts:49

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

src/array/order.ts:73
