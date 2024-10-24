/**
 * 检查字符串中是否有空格。
 * 至少存在一个空格。
 */
export function containsWhitespace(str: string) {
  return /\s/.test(str);
}

/**
 * 删除字符串中的空格（多个）
 */
export function removeWhitespace(str: string) {
  return str.replace(/\s+/g, '');
}

/**
 * 缩减字符串中的空格（多个）为一个空格，使其更加紧凑
 */
export function compactWhitespace(str: string) {
  return str.replace(/\s{2,}/g, ' ');
}

/**
 * 删除非 ASCII 字符
 * @example removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
 */
export function removeNonASCII(str: string) {
  return str.replace(/[^\x20-\x7E]/g, '');
}

/**
 * 使用正则表达式从字符串中删除 HTML/XML 标签
 * @example tripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
 */
export function stripHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * 计算字符串对应的字节大小
 */
export function byteSize(str: string) {
  return new Blob([str]).size;
}
