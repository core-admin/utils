[@hubxu/utils](../README.md) / [Exports](../modules.md) / string/convert-name

# Module: string/convert-name

## Table of contents

### Functions

- [convertCase](string_convert_name.md#convertcase)
- [toCamelCase](string_convert_name.md#tocamelcase)
- [toKebabCase](string_convert_name.md#tokebabcase)
- [toPascalCase](string_convert_name.md#topascalcase)
- [toSentenceCase](string_convert_name.md#tosentencecase)
- [toSnakeCase](string_convert_name.md#tosnakecase)
- [toTitleCase](string_convert_name.md#totitlecase)

## Functions

### convertCase

▸ **convertCase**(`name`, `toCase?`): `string`

根据类型转换命名

**`Example`**

```ts
convertCase('mixed_string with spaces_underscores-and-hyphens', 'camel'); // 'mixedStringWithSpacesUnderscoresAndHyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'pascal'); // 'MixedStringWithSpacesUnderscoresAndHyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'kebab'); // 'mixed-string-with-spaces-underscores-and-hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'snake'); // 'mixed_string_with_spaces_underscores_and_hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'title'); // 'Mixed String With Spaces Underscores And Hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'sentence'); // 'Mixed string with spaces underscores and hyphens'
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `toCase` | ``"title"`` \| ``"camel"`` \| ``"pascal"`` \| ``"kebab"`` \| ``"snake"`` \| ``"sentence"`` | `'camel'` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:117

___

### toCamelCase

▸ **toCamelCase**(`name`): `string`

将任意大小写转换为驼峰命名（小驼峰）

**`Example`**

```ts
toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized'); // 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:11

___

### toKebabCase

▸ **toKebabCase**(`name`): `string`

将任意大小写转换为短横线命名（kebab case）。
短横线大小写最常用于 URL slug 中。Kebab 大小写字符串全部小写，单词之间用连字符分隔。

**`Example`**

```ts
toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // 'all-the-small-things'
toKebabCase('IAmEditingSomeXMLAndHTML'); 'i-am-editing-some-xml-and-html'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:46

___

### toPascalCase

▸ **toPascalCase**(`name`): `string`

将任意大小写转换为帕斯卡命名（大驼峰命名）

**`Example`**

```ts
toPascalCase('some_database_field_name'); // 'SomeDatabaseFieldName'
toPascalCase('Some label that needs to be pascalized'); // 'SomeLabelThatNeedsToBePascalized'
toPascalCase('some-javascript-property'); // 'SomeJavascriptProperty'
toPascalCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'SomeMixedStringWithSpacesUnderscoresAndHyphens'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:28

___

### toSentenceCase

▸ **toSentenceCase**(`name`): `string`

将任意大小写转换为句子大小写（sentence case）。
句子中最常使用句子大小写。句子大小写字符串的第一个字母大写，单词之间用空格分隔。例如Some name是句子大小写，但some Name不是。

**`Example`**

```ts
toSentenceCase('some_database_field_name'); // 'Some database field name'
toSentenceCase('Some label that needs to be title-cased'); // 'Some label that needs to be title cased'
toSentenceCase('some-package-name'); // 'Some package name'
toSentenceCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'Some mixed string with spaces underscores and hyphens'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:98

___

### toSnakeCase

▸ **toSnakeCase**(`name`): `string`

将任意大小写转换为下划线命名（snake case 蛇形命名）。
蛇形命名法最常用于 Python 或 Ruby 等语言。蛇形字符串全部小写，单词之间用下划线分隔。例如some_name是蛇的情况，但some_Name不是。

**`Example`**

```ts
toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // 'all_the_small_things'
toSnakeCase('IAmEditingSomeXMLAndHTML'); // 'i_am_editing_some_xml_and_html'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:64

___

### toTitleCase

▸ **toTitleCase**(`name`): `string`

将任意大小写转换为标题命名（title case）。
标题大小写最常用于标题或标题中。标题大小写字符串的每个单词的第一个字母大写，单词之间用空格分隔。例如Some Name是标题大小写，但Some name不是。

**`Example`**

```ts
toTitleCase('some_database_field_name'); // 'Some Database Field Name'
toTitleCase('Some label that needs to be title-cased'); // 'Some Label That Needs To Be Title Cased'
toTitleCase('some-package-name'); // 'Some Package Name'
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'Some Mixed String With Spaces Underscores And Hyphens'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

src/string/convert-name.ts:81
