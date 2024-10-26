import type * as CSS from 'csstype';

export type Recordable<T = any> = Record<string, T>;

export interface CSSProperties
  extends CSS.Properties<string | number>,
    CSS.PropertiesHyphen<string | number> {}

export type Arrayable<T> = T | T[];

export type Numeric = number | string;

export type AnyFunction<T = any> = (...args: any[]) => T;
