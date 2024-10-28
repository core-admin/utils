[@hubxu/utils](../README.md) / [Exports](../modules.md) / id

# Module: id

## Table of contents

### Functions

- [generateUUID](id.md#generateuuid)

## Functions

### generateUUID

▸ **generateUUID**(): `string`

生成一个 UUID (通用唯一标识符)

该函数会按以下优先级使用不同的方法生成 UUID:
1. 使用 crypto.randomUUID() (如果可用)
2. 使用 crypto.getRandomValues() (如果可用)
3. 使用基于时间戳和随机数的回退方法

#### Returns

`string`

返回一个符合 RFC4122 v4 标准的 UUID 字符串,
                  格式为 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

#### Defined in

[src/id.ts:12](https://github.com/core-admin/utils/blob/48a655a/src/id.ts#L12)
