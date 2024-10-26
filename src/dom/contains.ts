/**
 * 检查一个节点是否包含另一个节点
 *
 * 此方法用于判断给定的根节点是否包含指定的子节点。它首先检查根节点是否存在，
 * 然后尝试使用原生的 contains 方法（如果可用）来进行判断。
 *
 * @param {Node | null | undefined} root - 要检查的根节点
 * @param {Node} [n] - 可能被包含的子节点
 * @returns {boolean} 如果根节点包含子节点，则返回 true；否则返回 false
 */
export function contains(root: Node | null | undefined, n?: Node) {
  if (!root) return false;
  if (root.contains) {
    // @ts-ignore
    return root.contains(n);
  }
  return false;
}
