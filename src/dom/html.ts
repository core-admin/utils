/**
 * 提取并处理HTML字符串中的图片标签
 *
 * @param {string} html - 需要处理的HTML字符串
 * @param {Function} [callback] - 可选的回调函数,用于处理每个找到的图片标签
 * @param {string} callback.imgDomString - 完整的img标签字符串
 * @param {string} callback.src - 图片的src属性值
 * @param {number} callback.index - 当前处理的图片索引
 * @param {Record<string, string>} callback.attrs - 图片标签的所有属性键值对
 * @returns {string} 处理后的HTML字符串
 *
 * @description
 * 此方法用于扫描HTML字符串中的所有img标签,并可以通过回调函数对每个图片的src进行处理。
 * 主要功能包括:
 * 1. 使用正则表达式匹配所有img标签
 * 2. 提取每个img标签的src属性和其他属性
 * 3. 通过回调函数可以自定义处理每个图片的src
 * 4. 如果回调函数返回新的src值,则会替换原始src
 *
 * @example
 * ```ts
 * const html = '<div><img src="old.jpg" alt="test"/></div>';
 * const result = extractImgSrc(html, (imgTag, src) => {
 *   return src.replace('old.jpg', 'new.jpg');
 * });
 *
 * result: '<div><img src="new.jpg" alt="test"/></div>'
 * ```
 */
export function extractImgSrc(
  html: string,
  callback?: (cbParams: {
    imgDomString: string;
    src: string;
    index: number;
    attrs: Record<any, any>;
  }) => undefined | string | void,
) {
  const regex = /<img.*?(?=\ssrc="(.*?)").*?(?<=\ssrc="(.*?)").*?>/g;
  let matches;
  let index = 0;
  let result = html;
  while ((matches = regex.exec(html)) !== null) {
    const imgTag = matches[0];
    const src = matches[1];
    const attrs: Record<string, string> = {};
    imgTag.replace(
      /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g,
      (_match, attr: string, value: string) => {
        attrs[attr] = value;
        return '';
      },
    );
    const replacement = callback?.({ imgDomString: imgTag, src, index, attrs });
    if (replacement !== undefined) {
      result = result.replace(imgTag, imgTag.replace(src, replacement));
    }
    index++;
  }
  return result;
}

/**
 * 模板字符串数据替换函数
 *
 * 此方法用于替换模板字符串中的变量占位符为实际数据。
 * 主要功能包括:
 * 1. 支持 {{variable}} 形式的变量占位符
 * 2. 从传入的数据对象中查找对应的变量值
 * 3. 自动替换所有匹配的占位符
 * 4. 对空模板字符串进行校验
 *
 * @param {string} template - 包含变量占位符的模板字符串
 * @param {Record<any, any>} data - 包含变量值的数据对象
 * @returns {string} 替换变量后的结果字符串
 * @throws {Error} 当模板字符串为空或类型错误时抛出错误
 *
 * @example
 * ```ts
 * const template = 'Hello {{name}}, your age is {{age}}';
 * const data = { name: 'Tom', age: 18 };
 * const result = templateDataReplace(template, data);
 *
 * result: 'Hello Tom, your age is 18'
 * ```
 */
export function templateDataReplace(template: string, data: Record<any, any>): string {
  if (typeof template !== 'string' || template === '') {
    throw new Error('Please check if the parameter value of the first entry is correct');
  }
  return template.replace(/{{\s*([^{}\s]+)\s*}}/g, (_, key: string) => {
    return data[key];
  });
}

// 正则表达式匹配各种空白字符，包括零宽度空格
/**
 * 检查字符串是否包含不可见字符
 *
 * 不可见字符包括:
 * - 空格、制表符等普通空白字符
 * - 零宽空格(U+200B)
 * - 零宽连接符(U+200C)
 * - 零宽非连接符(U+200D)
 * - 字节顺序标记(U+FEFF)
 * - 单词连接符(U+2060)
 * - 蒙古语元音分隔符(U+180E)
 * - 不换行空格(U+00A0)
 * - 空格(U+0020)
 * - 表意文字空格(U+3000)
 * - Ogham空格标记(U+1680)
 * - en quad到hair space(U+2000-U+200A)
 *
 * @param {string} str - 要检查的字符串
 * @returns {boolean} 如果包含不可见字符返回true,否则返回false
 */
function containsInvisibleCharacters(str: string) {
  const invisibleCharsPattern =
    /[\s\u200B-\u200D\uFEFF\u2060\u180E\u00A0\u0020\u3000\u1680\u2000-\u200A]/g;
  return invisibleCharsPattern.test(str);
}

/**
 * 获取字符串的实际字符长度
 *
 * 此方法会:
 * 1. 优先使用 Intl.Segmenter API 计算字符长度(如果浏览器支持)
 * 2. 如果不支持,则使用 Array.from 将字符串转为数组并过滤掉不可见字符
 * 3. 过滤掉空字符串
 *
 * @param {string} str - 要计算长度的字符串
 * @returns {number|string[]} 使用Segmenter时返回数字,否则返回过滤后的字符数组
 *
 * @example
 * ```ts
 * const str = 'abc哈哈🫣🫵👨';
 * const length = getCharLength(str);
 *
 * length: 8
 * ```
 */
export function getCharLength(str: string) {
  // 此 api 有兼容性问题
  if (typeof Intl?.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).length;
  }

  return Array.from(str).filter(char => {
    return !containsInvisibleCharacters(char) && char !== '';
  }).length;
}

/**
 * 转义 HTML
 */
/**
 * 转义HTML字符串中的特殊字符
 *
 * 此方法会将以下字符转义为HTML实体:
 * - & -> &amp;
 * - < -> &lt;
 * - > -> &gt;
 * - ' -> &#39;
 * - " -> &quot;
 *
 * @param {string} str - 要转义的HTML字符串
 * @returns {string} 转义后的字符串
 *
 * @example
 * ```ts
 * escapeHtml('<div class="test">')
 * 返回: &lt;div class=&quot;test&quot;&gt;
 * ```
 */
export function escapeHtml(str: string) {
  return str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[tag] || tag,
  );
}

/**
 * 将转义后的HTML实体还原为原始字符
 *
 * 此方法会将以下HTML实体还原为原始字符:
 * - &amp; -> &
 * - &lt; -> <
 * - &gt; -> >
 * - &#39; -> '
 * - &quot; -> "
 *
 * @param {string} str - 包含HTML实体的字符串
 * @returns {string} 还原后的原始字符串
 *
 * @example
 * ```ts
 * unescapeHtml('&lt;div class=&quot;test&quot;&gt;')
 * 返回: <div class="test">
 * ```
 */
export function unescapeHtml(str: string) {
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      })[tag] || tag,
  );
}
