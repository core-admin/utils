import supportsPassive from '../supports-passive';
import { AnyFunction } from '../typing';

/**
 * 为目标元素添加事件监听器
 * 
 * @description 
 * 此方法是对原生 addEventListener 的封装,提供以下增强功能:
 * 1. 自动处理触摸事件和滚轮事件的 passive 选项
 * 2. 提供便捷的移除监听器方法
 * 3. 自动检查目标元素是否支持事件监听
 *
 * @param {EventTarget} target - 要添加事件监听的目标元素
 * @param {string} eventType - 事件类型,如 'click', 'touchstart' 等
 * @param {EventListener} cb - 事件处理回调函数
 * @param {AddEventListenerOptions} [option] - 事件监听选项
 * @returns {{remove: () => void}} 返回一个包含 remove 方法的对象,用于移除事件监听
 *
 * @example
 * ```ts
 * const listener = addEventListener(button, 'click', () => {
 *   console.log('按钮被点击');
 * });
 * 
 * // 移除监听器
 * listener.remove();
 * ```
 */
export function addEventListener(
  target: EventTarget,
  eventType: string,
  cb: EventListener,
  option?: AddEventListenerOptions,
) {
  if (target && target.addEventListener) {
    let opt = option;
    if (
      opt === undefined &&
      supportsPassive &&
      (eventType === 'touchstart' || eventType === 'touchmove' || eventType === 'wheel')
    ) {
      opt = { passive: false };
    }
    target.addEventListener(eventType, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}

/**
 * 为元素添加一次性事件监听器
 * @description 添加的事件监听器只会触发一次，触发后会自动移除
 * @param {HTMLElement} el - 要添加事件监听的HTML元素
 * @param {string} event - 事件名称
 * @param {EventListener} fn - 事件处理函数
 *
 * @example
 * 添加一次性点击事件
 * onceEvent(button, 'click', () => {
 *   console.log('这个处理函数只会执行一次');
 * });
 */
export function onceEvent(el: HTMLElement, event: string, fn: EventListener) {
  if (!el || !event || !fn) return;
  const listener = function (this: HTMLElement, evt: Event) {
    fn.call(this, evt);
    offEvent(el, event, listener);
  };
  onEvent(el, event, listener);
}

export function onEvent(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

export function offEvent(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: AnyFunction<any>,
) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}

/**
 * 手动触发DOM事件
 * @description 此方法用于以编程方式触发DOM事件。它会根据事件名称自动选择合适的事件构造函数（MouseEvent、KeyboardEvent或Event）
 * 来创建和分发事件。支持鼠标事件、键盘事件和其他标准DOM事件。
 *
 * @param {HTMLElement} element - 要触发事件的目标DOM元素
 * @param {string} name - 要触发的事件名称（如 'click', 'keydown', 'focus'等）
 * @param {...any[]} opts - 事件配置选项数组，第一个参数为bubbles（是否冒泡），第二个参数为cancelable（是否可取消）
 * @returns {HTMLElement} 返回触发事件的元素
 *
 * @example
 * 触发一个点击事件
 * triggerEvent(button, 'click', true, true);
 *
 * 触发一个键盘事件
 * triggerEvent(input, 'keydown', true, true);
 *
 * 触发一个自定义事件
 * triggerEvent(element, 'custom-event', true, false);
 */
export function triggerEvent(element: HTMLElement, name: string, ...opts: Array<any>): HTMLElement {
  let event: Event;

  if (name.includes('mouse') || name.includes('click')) {
    // 使用 MouseEvent 构造函数
    event = new MouseEvent(name, { bubbles: opts[0], cancelable: opts[1] });
  } else if (name.includes('key')) {
    // 使用 KeyboardEvent 构造函数
    // 注意：KeyboardEvent 的构造函数可能需要更多的参数，如 key, code 等
    event = new KeyboardEvent(name, { bubbles: opts[0], cancelable: opts[1] });
  } else {
    // 对于其他事件，使用 Event 构造函数
    event = new Event(name, { bubbles: opts[0], cancelable: opts[1] });
  }

  element.dispatchEvent(event);
  return element;
}
