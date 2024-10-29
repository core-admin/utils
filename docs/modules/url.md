[@hubxu/utils](../README.md) / [Exports](../modules.md) / url

# Module: url

## Table of contents

### Functions

- [parseUrl](url.md#parseurl)
- [redirectToHttps](url.md#redirecttohttps)
- [setObjToUrlParams](url.md#setobjtourlparams)

## Functions

### parseUrl

▸ **parseUrl**(`url`): { `hash`: `any` ; `host`: `any` ; `path`: `any` ; `protocol`: `any` ; `query`: `any`  } & [`Recordable`](typing.md#recordable)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

{ `hash`: `any` ; `host`: `any` ; `path`: `any` ; `protocol`: `any` ; `query`: `any`  } & [`Recordable`](typing.md#recordable)

#### Defined in

[src/url/index.ts:25](https://github.com/core-admin/utils/blob/48a655a/src/url/index.ts#L25)

___

### redirectToHttps

▸ **redirectToHttps**(): `void`

http跳转到https

#### Returns

`void`

#### Defined in

[src/url/index.ts:59](https://github.com/core-admin/utils/blob/48a655a/src/url/index.ts#L59)

___

### setObjToUrlParams

▸ **setObjToUrlParams**(`baseUrl`, `obj`): `string`

Add the object as a parameter to the URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseUrl` | `string` | url |
| `obj` | `any` |  |

#### Returns

`string`

eg:
 let obj = {a: '3', b: '4'}
 setObjToUrlParams('www.baidu.com', obj)
 ==>www.baidu.com?a=3&b=4

如果正在编码的字符串只是 URL 的一部分，则应该使用此函数：encodeURIComponent
如果字符串是作为整个 URL 的一部分（例如作为参数传递给 window.open），则应该使用此函数：encodeURI

#### Defined in

[src/url/index.ts:16](https://github.com/core-admin/utils/blob/48a655a/src/url/index.ts#L16)
