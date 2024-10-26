/**
 * 检测浏览器是否支持 passive event listeners。
 * passive event listeners 是一种性能优化技术，特别是对于触摸和滚动事件。
 * 使用 passive event listeners 可以告诉浏览器事件处理程序不会调用 preventDefault()，
 * 从而允许浏览器在等待 JavaScript 执行完毕之前就开始滚动页面，提高页面的响应速度。
 * 通过这种检测，开发者可以根据浏览器的支持情况来决定是否使用 passive event listeners，
 * 从而在支持的浏览器中获得性能提升，同时在不支持的浏览器中保持兼容性。
 */
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });
  // @ts-expect-error
  window.addEventListener('testPassive', null, opts);
  // @ts-expect-error
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

export default supportsPassive;
