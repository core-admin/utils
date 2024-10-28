[@hubxu/utils](../README.md) / [Exports](../modules.md) / dom/event

# Module: dom/event

## Table of contents

### Functions

- [addEventListener](dom_event.md#addeventlistener)
- [offEvent](dom_event.md#offevent)
- [onEvent](dom_event.md#onevent)
- [onceEvent](dom_event.md#onceevent)
- [triggerEvent](dom_event.md#triggerevent)

## Functions

### addEventListener

▸ **addEventListener**(`target`, `eventType`, `cb`, `option?`): `Object`

为目标元素添加事件监听器

**`Description`**

此方法是对原生 addEventListener 的封装,提供以下增强功能:
1. 自动处理触摸事件和滚轮事件的 passive 选项
2. 提供便捷的移除监听器方法
3. 自动检查目标元素是否支持事件监听

**`Example`**

```ts
const listener = addEventListener(button, 'click', () => {
  console.log('按钮被点击');
});

// 移除监听器
listener.remove();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `EventTarget` | 要添加事件监听的目标元素 |
| `eventType` | `string` | 事件类型,如 'click', 'touchstart' 等 |
| `cb` | `EventListener` | 事件处理回调函数 |
| `option?` | `AddEventListenerOptions` | 事件监听选项 |

#### Returns

`Object`

返回一个包含 remove 方法的对象,用于移除事件监听

| Name | Type |
| :------ | :------ |
| `remove` | () => `void` |

#### Defined in

src/dom/event.ts:29

___

### offEvent

▸ **offEvent**(`element`, `event`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` \| `Window` \| `Document` \| `HTMLElement` |
| `event` | `string` |
| `handler` | [`AnyFunction`](typing.md#anyfunction)<`any`\> |

#### Returns

`void`

#### Defined in

src/dom/event.ts:87

___

### onEvent

▸ **onEvent**(`element`, `event`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` \| `Window` \| `Document` \| `HTMLElement` |
| `event` | `string` |
| `handler` | `EventListenerOrEventListenerObject` |

#### Returns

`void`

#### Defined in

src/dom/event.ts:77

___

### onceEvent

▸ **onceEvent**(`el`, `event`, `fn`): `void`

为元素添加一次性事件监听器

**`Description`**

添加的事件监听器只会触发一次，触发后会自动移除

**`Example`**

```ts
添加一次性点击事件
onceEvent(button, 'click', () => {
  console.log('这个处理函数只会执行一次');
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `el` | `HTMLElement` | 要添加事件监听的HTML元素 |
| `event` | `string` | 事件名称 |
| `fn` | `EventListener` | 事件处理函数 |

#### Returns

`void`

#### Defined in

src/dom/event.ts:68

___

### triggerEvent

▸ **triggerEvent**(`element`, `name`, `...opts`): `HTMLElement`

手动触发DOM事件

**`Description`**

此方法用于以编程方式触发DOM事件。它会根据事件名称自动选择合适的事件构造函数（MouseEvent、KeyboardEvent或Event）
来创建和分发事件。支持鼠标事件、键盘事件和其他标准DOM事件。

**`Example`**

```ts
触发一个点击事件
triggerEvent(button, 'click', true, true);

触发一个键盘事件
triggerEvent(input, 'keydown', true, true);

触发一个自定义事件
triggerEvent(element, 'custom-event', true, false);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | 要触发事件的目标DOM元素 |
| `name` | `string` | 要触发的事件名称（如 'click', 'keydown', 'focus'等） |
| `...opts` | `any`[] | 事件配置选项数组，第一个参数为bubbles（是否冒泡），第二个参数为cancelable（是否可取消） |

#### Returns

`HTMLElement`

返回触发事件的元素

#### Defined in

src/dom/event.ts:117
