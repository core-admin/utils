[@hubxu/utils](../README.md) / [Exports](../modules.md) / validate

# Module: validate

## Table of contents

### Functions

- [isChineseName](validate.md#ischinesename)
- [isEmailValid](validate.md#isemailvalid)
- [isIDCard](validate.md#isidcard)
- [isIDCardNew](validate.md#isidcardnew)

## Functions

### isChineseName

▸ **isChineseName**(`str`): `boolean`

验证是否是中文名

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

src/validate.ts:4

___

### isEmailValid

▸ **isEmailValid**(`address`): `boolean`

验证是否是邮箱

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

src/validate.ts:28

___

### isIDCard

▸ **isIDCard**(`str`): `boolean`

验证是否是身份证号，支持一代和二代身份证号（15/18位）

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

src/validate.ts:19

___

### isIDCardNew

▸ **isIDCardNew**(`str`): `boolean`

验证是否是二代身份证号（2代,18位数字），最后一位是校验位，可能为数字或字符X

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

src/validate.ts:11
