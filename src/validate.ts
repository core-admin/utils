/**
 * 验证是否是中文名
 */
export function isChineseName(str: string) {
  return /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(str);
}

/**
 * 验证是否是二代身份证号（2代,18位数字），最后一位是校验位，可能为数字或字符X
 */
export function isIDCardNew(str: string) {
  return /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(str);
}

/**
 * 验证是否是身份证号，支持一代和二代身份证号（15/18位）
 * @param { string } value
 */
export function isIDCard(str: string) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    str,
  );
}

/**
 * 验证是否是邮箱
 */
export function isEmailValid(address: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}
