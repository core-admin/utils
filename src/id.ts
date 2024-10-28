/**
 * 生成一个 UUID (通用唯一标识符)
 *
 * 该函数会按以下优先级使用不同的方法生成 UUID:
 * 1. 使用 crypto.randomUUID() (如果可用)
 * 2. 使用 crypto.getRandomValues() (如果可用)
 * 3. 使用基于时间戳和随机数的回退方法
 *
 * @returns {string} 返回一个符合 RFC4122 v4 标准的 UUID 字符串,
 *                   格式为 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
export function generateUUID(): string {
  // 优先使用 crypto.randomUUID()
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // 其次使用 crypto.getRandomValues()
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);

    // 设置版本 (4) 和变体 (RFC4122)
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    return Array.from(buffer, byte => byte.toString(16).padStart(2, '0'))
      .join('')
      .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }

  // 如果以上方法都不可用，使用改进的 Math.random() 方法
  const d = new Date().getTime();
  const perfNow =
    typeof performance !== 'undefined' && typeof performance.now === 'function'
      ? performance.now()
      : 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.floor((d + perfNow + Math.random() * 16) % 16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
