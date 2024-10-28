[@hubxu/utils](../README.md) / [Exports](../modules.md) / file

# Module: file

## Table of contents

### Functions

- [base64ToBlob](file.md#base64toblob)
- [extname](file.md#extname)
- [extractFileInfoFromUrl](file.md#extractfileinfofromurl)
- [fileToBase64Async](file.md#filetobase64async)
- [formatFileSize](file.md#formatfilesize)
- [getUrlFileNameAndType](file.md#geturlfilenameandtype)
- [isBase64File](file.md#isbase64file)
- [parseFileDetail](file.md#parsefiledetail)
- [previewImage](file.md#previewimage)

## Functions

### base64ToBlob

▸ **base64ToBlob**(`base64Buf`): `Blob`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base64Buf` | `string` |

#### Returns

`Blob`

#### Defined in

[src/file/index.ts:187](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L187)

___

### extname

▸ **extname**(`url?`): `string`

获取URL中文件的扩展名

**`Description`**

此函数接受一个URL字符串，并返回其中文件名的扩展名。
它会处理以下情况：
1. 从URL中提取文件名
2. 移除文件名中的查询参数和哈希部分
3. 提取扩展名（包括点号）

注意：
- 如果URL不包含文件名或扩展名，将返回空字符串
- 此函数不验证URL的有效性，仅基于字符串操作

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url?` | `string` | `''` | 要解析的URL字符串 |

#### Returns

`string`

返回文件的扩展名（包括点号），如果没有扩展名则返回空字符串

#### Defined in

[src/file/index.ts:45](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L45)

___

### extractFileInfoFromUrl

▸ **extractFileInfoFromUrl**(`url`): `UrlFileInfo` \| ``null``

从URL中提取文件信息

**`Example`**

```ts
extractFileInfoFromUrl('https://example.com/path/file.txt?param=1')
// 返回 { type: 'txt', name: 'file', fileName: 'file.txt' }

extractFileInfoFromUrl('https://example.com/invalid')
// 返回 null
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | 包含文件的URL地址 |

#### Returns

`UrlFileInfo` \| ``null``

返回包含文件名、类型等信息的对象,如果无法解析则返回null

#### Defined in

[src/file/index.ts:136](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L136)

___

### fileToBase64Async

▸ **fileToBase64Async**(`file`): `Promise`<`string`\>

将文件或二进制数据转换为Base64字符串

**`Description`**

此函数使用FileReader将文件或二进制数据读取为Data URL格式的Base64字符串。
Data URL格式为: data:[<mediatype>][;base64],<data>

**`Example`**

```ts
const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
const base64 = await fileToBase64Async(file);
// base64 = "data:text/plain;base64,aGVsbG8="
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `Blob` \| `File` | 要转换的文件或二进制数据 |

#### Returns

`Promise`<`string`\>

返回一个Promise，解析为文件的Base64字符串

#### Defined in

[src/file/index.ts:176](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L176)

___

### formatFileSize

▸ **formatFileSize**(`fileSize?`): `string`

格式化文件大小

**`Description`**

此函数将文件字节大小转换为人类可读的格式。
支持的单位包括: B, KB, MB, GB, TB, PB, EB, ZB, YB
结果保留2位小数

**`Example`**

```ts
formatFileSize(1024) // 返回 "1.00 KB"
formatFileSize(1234567) // 返回 "1.18 MB"
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fileSize?` | `number` | `0` | 文件大小（字节数） |

#### Returns

`string`

返回格式化后的文件大小字符串，包含单位

#### Defined in

[src/file/index.ts:16](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L16)

___

### getUrlFileNameAndType

▸ **getUrlFileNameAndType**(`fileName`): `Object`

从文件名中提取文件类型和名称

**`Example`**

```ts
getUrlFileNameAndType('path/to/file.txt')
返回 { type: 'txt', name: 'file' }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileName` | `string` | 完整的文件名（可能包含路径） |

#### Returns

`Object`

包含文件类型和名称的对象

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | `string` |

#### Defined in

[src/file/index.ts:62](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L62)

___

### isBase64File

▸ **isBase64File**(`str`): `boolean`

判断是否为base64文件

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/file/index.ts:156](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L156)

___

### parseFileDetail

▸ **parseFileDetail**(`file`): `Object`

解析文件详细信息

**`Example`**

```ts
const fileInfo = parseFileDetail(file);
console.log(fileInfo);
// {
//   fileName: "example.txt",
//   name: "example",
//   fileSuffix: "txt",
//   fileSuffixUpper: "TXT",
//   size: 1024,
//   mime: "text/plain",
//   formatSize: "1.00KB",
//   raw: File
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | 要解析的文件对象 |

#### Returns

`Object`

返回包含文件详细信息的对象

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |
| `fileSuffix` | `string` |
| `fileSuffixUpper` | `string` |
| `formatSize` | `string` |
| `mime` | `string` |
| `name` | `string` |
| `raw` | `File` |
| `size` | `number` |

#### Defined in

[src/file/index.ts:100](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L100)

___

### previewImage

▸ **previewImage**(`file`): `Promise`<`string`\>

预览图片文件并生成缩略图

**`Description`**

此函数接受一个File或Blob对象，创建一个200x200像素的画布，
并在其上绘制图片的缩略图。它会保持图片的宽高比，并居中裁剪。
对于SVG文件，会使用FileReader读取。
最后返回画布的Data URL。

注意：
- 如果输入不是图片文件，将返回空字符串
- 使用了跨域设置，以支持跨域图片
- 临时创建的画布元素会被添加到DOM中，然后在使用后移除

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `Blob` \| `File` | 要预览的图片文件 |

#### Returns

`Promise`<`string`\>

返回一个Promise，解析为图片的Data URL

#### Defined in

[src/file/index.ts:220](https://github.com/core-admin/utils/blob/48a655a/src/file/index.ts#L220)
