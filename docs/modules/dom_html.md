[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/html

# Module: dom/html

## Table of contents

### Functions

- [escapeHtml](dom_html.md#escapehtml)
- [extractImgSrc](dom_html.md#extractimgsrc)
- [getCharLength](dom_html.md#getcharlength)
- [templateDataReplace](dom_html.md#templatedatareplace)
- [unescapeHtml](dom_html.md#unescapehtml)

## Functions

### escapeHtml

▸ **escapeHtml**(`str`): `string`

转义HTML字符串中的特殊字符

此方法会将以下字符转义为HTML实体:
- & -> &amp;
- < -> &lt;
- > -> &gt;
- ' -> &#39;
- " -> &quot;

**`Example`**

```ts
escapeHtml('<div class="test">')
返回: &lt;div class=&quot;test&quot;&gt;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | 要转义的HTML字符串 |

#### Returns

`string`

转义后的字符串

#### Defined in

src/dom/html.ts:176

___

### extractImgSrc

▸ **extractImgSrc**(`html`, `callback?`): `string`

提取并处理HTML字符串中的图片标签

**`Description`**

此方法用于扫描HTML字符串中的所有img标签,并可以通过回调函数对每个图片的src进行处理。
主要功能包括:
1. 使用正则表达式匹配所有img标签
2. 提取每个img标签的src属性和其他属性
3. 通过回调函数可以自定义处理每个图片的src
4. 如果回调函数返回新的src值,则会替换原始src

**`Example`**

```ts
const html = '<div><img src="old.jpg" alt="test"/></div>';
const result = extractImgSrc(html, (imgTag, src) => {
  return src.replace('old.jpg', 'new.jpg');
});

result: '<div><img src="new.jpg" alt="test"/></div>'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` | 需要处理的HTML字符串 |
| `callback?` | (`imgDomString`: `string`, `src`: `string`, `index`: `number`, `attrs`: `Record`<`any`, `any`\>) => `undefined` \| `string` | 可选的回调函数,用于处理每个找到的图片标签 |

#### Returns

`string`

处理后的HTML字符串

#### Defined in

src/dom/html.ts:30

___

### getCharLength

▸ **getCharLength**(`str`): `number` \| `string`[]

获取字符串的实际字符长度

此方法会:
1. 优先使用 Intl.Segmenter API 计算字符长度(如果浏览器支持)
2. 如果不支持,则使用 Array.from 将字符串转为数组并过滤掉不可见字符
3. 过滤掉空字符串

**`Example`**

```ts
const str = 'abc哈哈🫣🫵👨';
const length = getCharLength(str);

length: 8
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | 要计算长度的字符串 |

#### Returns

`number` \| `string`[]

使用Segmenter时返回数字,否则返回过滤后的字符数组

#### Defined in

src/dom/html.ts:142

___

### templateDataReplace

▸ **templateDataReplace**(`template`, `data`): `string`

模板字符串数据替换函数

此方法用于替换模板字符串中的变量占位符为实际数据。
主要功能包括:
1. 支持 {{variable}} 形式的变量占位符
2. 从传入的数据对象中查找对应的变量值
3. 自动替换所有匹配的占位符
4. 对空模板字符串进行校验

**`Throws`**

当模板字符串为空或类型错误时抛出错误

**`Example`**

```ts
const template = 'Hello {{name}}, your age is {{age}}';
const data = { name: 'Tom', age: 18 };
const result = templateDataReplace(template, data);

result: 'Hello Tom, your age is 18'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `string` | 包含变量占位符的模板字符串 |
| `data` | `Record`<`any`, `any`\> | 包含变量值的数据对象 |

#### Returns

`string`

替换变量后的结果字符串

#### Defined in

src/dom/html.ts:87

___

### unescapeHtml

▸ **unescapeHtml**(`str`): `string`

将转义后的HTML实体还原为原始字符

此方法会将以下HTML实体还原为原始字符:
- &amp; -> &
- &lt; -> <
- &gt; -> >
- &#39; -> '
- &quot; -> "

**`Example`**

```ts
unescapeHtml('&lt;div class=&quot;test&quot;&gt;')
返回: <div class="test">
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | 包含HTML实体的字符串 |

#### Returns

`string`

还原后的原始字符串

#### Defined in

src/dom/html.ts:209
