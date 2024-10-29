[@hubxu/utils](../README.md) / [Exports](../modules.md) / string

# Module: string

## Table of contents

### References

- [convertCase](string.md#convertcase)
- [toCamelCase](string.md#tocamelcase)
- [toKebabCase](string.md#tokebabcase)
- [toPascalCase](string.md#topascalcase)
- [toSentenceCase](string.md#tosentencecase)
- [toSnakeCase](string.md#tosnakecase)
- [toTitleCase](string.md#totitlecase)

### Functions

- [byteSize](string.md#bytesize)
- [compactWhitespace](string.md#compactwhitespace)
- [containsWhitespace](string.md#containswhitespace)
- [removeNonASCII](string.md#removenonascii)
- [removeWhitespace](string.md#removewhitespace)
- [stripHTMLTags](string.md#striphtmltags)

## References

### convertCase

Re-exports [convertCase](string_convert_name.md#convertcase)

___

### toCamelCase

Re-exports [toCamelCase](string_convert_name.md#tocamelcase)

___

### toKebabCase

Re-exports [toKebabCase](string_convert_name.md#tokebabcase)

___

### toPascalCase

Re-exports [toPascalCase](string_convert_name.md#topascalcase)

___

### toSentenceCase

Re-exports [toSentenceCase](string_convert_name.md#tosentencecase)

___

### toSnakeCase

Re-exports [toSnakeCase](string_convert_name.md#tosnakecase)

___

### toTitleCase

Re-exports [toTitleCase](string_convert_name.md#totitlecase)

## Functions

### byteSize

▸ **byteSize**(`str`): `number`

计算字符串对应的字节大小

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`number`

#### Defined in

[src/string/index.ts:44](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L44)

___

### compactWhitespace

▸ **compactWhitespace**(`str`): `string`

缩减字符串中的空格（多个）为一个空格，使其更加紧凑

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/string/index.ts:21](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L21)

___

### containsWhitespace

▸ **containsWhitespace**(`str`): `boolean`

检查字符串中是否有空格。
至少存在一个空格。

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/string/index.ts:7](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L7)

___

### removeNonASCII

▸ **removeNonASCII**(`str`): `string`

删除非 ASCII 字符

**`Example`**

```ts
removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/string/index.ts:29](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L29)

___

### removeWhitespace

▸ **removeWhitespace**(`str`): `string`

删除字符串中的空格（多个）

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/string/index.ts:14](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L14)

___

### stripHTMLTags

▸ **stripHTMLTags**(`str`): `string`

使用正则表达式从字符串中删除 HTML/XML 标签

**`Example`**

```ts
tripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/string/index.ts:37](https://github.com/core-admin/utils/blob/48a655a/src/string/index.ts#L37)
