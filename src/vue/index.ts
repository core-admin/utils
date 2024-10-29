import { getProp } from '@/object';

// Vue 相关的 hooks 函数
export const useVue = (...args: any) => {
  // 实现你的 Vue hook

  // @ts-ignore
  return getProp(...args);
};

// 其他 Vue 相关函数
export const vueHelper = () => {
  // ...
};
