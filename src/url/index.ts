import { Recordable } from '../typing';

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 *
 * 如果正在编码的字符串只是 URL 的一部分，则应该使用此函数：encodeURIComponent
 * 如果字符串是作为整个 URL 的一部分（例如作为参数传递给 window.open），则应该使用此函数：encodeURI
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`;
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function parseUrl(url: string) {
  const urlObj = {
    protocol: /^([^:]+):/,
    host: /:\/\/(.+?)[?#\s/]/,
    path: /\w(\/.*?)[?#\s]/,
    query: /\?(.+?)[#/\s]/,
    hash: /#(\w+)\s$/,
  };
  const res: {
    [K in keyof typeof urlObj]: any;
  } & Recordable = {} as any;
  url += ' ';
  function formatQuery(str: string) {
    return str.split('&').reduce((a, b) => {
      const arr = b.split('=');
      // 解码一下
      a[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
      return a;
    }, {} as Recordable);
  }
  for (const key in urlObj) {
    const pattern = urlObj[key as keyof typeof urlObj];
    const value =
      key === 'query'
        ? pattern.exec(url) && formatQuery(pattern.exec(url)![1])
        : pattern.exec(url) && pattern.exec(url)![1];
    res[key] = value || undefined;
  }
  return res;
}

/**
 * http跳转到https
 */
export function redirectToHttps() {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
}
