[@hubxu/utils](../README.md) / [Exports](../modules.md) / number

# Module: number

## Table of contents

### Functions

- [addNumber](number.md#addnumber)
- [clamp](number.md#clamp)
- [divideNumber](number.md#dividenumber)
- [formatNumber](number.md#formatnumber)
- [multiplyNumber](number.md#multiplynumber)
- [padZero](number.md#padzero)
- [subtractNumber](number.md#subtractnumber)

## Functions

### addNumber

▸ **addNumber**(`num1`, `num2`): `number`

精确加法函数

此方法用于执行两个数字的精确加法，避免浮点数计算中的精度问题。
它通过将数字放大、四舍五入后再缩小的方式来保证计算的准确性。

**`Example`**

```ts
addNumber(0.1, 0.2) // 返回 0.3，而不是 0.30000000000000004
addNumber(1.23e-10, 4.56e-10) // 返回 5.79e-10
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num1` | `number` | 第一个加数 |
| `num2` | `number` | 第二个加数 |

#### Returns

`number`

两个数字的精确和

#### Defined in

src/number/index.ts:109

___

### clamp

▸ **clamp**(`num`, `min`, `max`): `number`

将数字限制在指定的范围内

**`Example`**

```ts
clamp(10, 0, 5) // 返回 5
clamp(-5, 0, 100) // 返回 0
clamp(50, 0, 100) // 返回 50
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | 要限制的数字 |
| `min` | `number` | 允许的最小值 |
| `max` | `number` | 允许的最大值 |

#### Returns

`number`

限制在指定范围内的数字

#### Defined in

src/number/index.ts:35

___

### divideNumber

▸ **divideNumber**(`num1`, `num2`): `number`

精确除法函数

**`Example`**

```ts
divideNumber(0.3, 0.1) // 返回 3，而不是 2.9999999999999996
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num1` | `number` | 被除数 |
| `num2` | `number` | 除数 |

#### Returns

`number`

两个数字的精确商

#### Defined in

src/number/index.ts:154

___

### formatNumber

▸ **formatNumber**(`value`, `allowDot?`, `allowMinus?`): `string`

格式化数字字符串

此方法用于处理数字字符串，可以控制是否允许小数点和负号。
它会移除所有非法字符，并确保小数点和负号的正确使用。

**`Example`**

```ts
formatNumber('123.456') // 返回 '123.456'
formatNumber('-123.456', false) // 返回 '-123'
formatNumber('123.456', true, false) // 返回 '123.456'
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `string` | `undefined` | 要格式化的数字字符串 |
| `allowDot?` | `boolean` | `true` | 是否允许小数点 |
| `allowMinus?` | `boolean` | `true` | 是否允许负号 |

#### Returns

`string`

格式化后的数字字符串

#### Defined in

src/number/index.ts:77

___

### multiplyNumber

▸ **multiplyNumber**(`num1`, `num2`): `number`

精确乘法函数

**`Example`**

```ts
multiplyNumber(0.1, 0.2) // 返回 0.02，而不是 0.020000000000000004
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num1` | `number` | 第一个乘数 |
| `num2` | `number` | 第二个乘数 |

#### Returns

`number`

两个数字的精确积

#### Defined in

src/number/index.ts:124

___

### padZero

▸ **padZero**(`num`, `targetLength?`): `string`

在数字前填充零以达到指定长度

**`Example`**

```ts
padZero(5, 3) // 返回 "005"
padZero(42) // 返回 "42"
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `num` | [`Numeric`](typing.md#numeric) | `undefined` | 要填充的数字 |
| `targetLength?` | `number` | `2` | 目标字符串长度 |

#### Returns

`string`

填充零后的字符串

#### Defined in

src/number/index.ts:14

___

### subtractNumber

▸ **subtractNumber**(`num1`, `num2`): `number`

精确减法函数

**`Example`**

```ts
subtractNumber(0.3, 0.2) // 返回 0.1，而不是 0.09999999999999998
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num1` | `number` | 被减数 |
| `num2` | `number` | 减数 |

#### Returns

`number`

两个数字的精确差

#### Defined in

src/number/index.ts:139
