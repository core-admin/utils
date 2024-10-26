/**
 * 删除树中的空children属性
 */
export function removeEmptyChildrenIterative<T extends Record<string, any>>(data: T[]): void {
  const stack: T[] = [...data];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (currentNode.children) {
      if (currentNode.children.length === 0) {
        delete currentNode.children;
      } else {
        for (const child of currentNode.children) {
          stack.push(child);
        }
      }
    }
  }
}

type BuildTreeNode<T> = T & {
  children: BuildTreeNode<T>[];
};

/**
 * 将扁平数据转换为树形结构
 *
 * @export
 * @template T 扩展自 Record<string | number, any> 的类型
 * @param {T[]} arr 需要转换的扁平数据数组
 * @param {{ selfKey?: string; parentKey?: string; rootValue?: string | number }} [options] 可选的配置参数
 * @param {string} [options.selfKey='id'] 对象自身的键，默认为 'id'
 * @param {string} [options.parentKey='pid'] 对象父级的键，默认为 'pid'
 * @param {(string | number)} [options.rootValue=0] 根节点的值，默认为 0，pid = 0 的节点为根节点
 * @returns {BuildTreeNode<T>[]} 返回树形结构的数组
 */
export function buildTree<T extends Record<string | number, any>>(
  arr: T[],
  options?: { selfKey?: string; parentKey?: string; rootValue?: string | number },
) {
  const { selfKey = 'id', parentKey = 'pid', rootValue = 0 } = options ?? {};
  const map = new Map<string | number, BuildTreeNode<T>>();
  const result: BuildTreeNode<T>[] = [];

  arr.forEach(item => {
    if (!map.has(item[selfKey])) {
      map.set(item[selfKey], { ...item, children: [] });
    }
    const currentNode = map.get(item[selfKey])!;

    if (item[parentKey] === rootValue) {
      result.push(currentNode);
    } else {
      if (!map.has(item[parentKey])) {
        // @ts-expect-error
        map.set(item[parentKey], { children: [currentNode] });
      } else {
        map.get(item[parentKey])!.children.push(currentNode);
      }
    }
  });

  return result;
}

interface FindTreeValueAndPathResult<T> {
  node: T | null;
  path: T[];
}

/**
 * 根据id查找树中的节点及路径
 */
export function findTreeNodeAndPathByIdIterative<T extends Record<string, any>>(
  data: T[],
  id: number,
): FindTreeValueAndPathResult<T> {
  const stack: { node: T; path: T[] }[] = data.map(node => ({ node, path: [] }));

  while (stack.length > 0) {
    const { node, path } = stack.pop()!;
    if (node.id === id) {
      return { node: node, path };
    }
    for (const child of node.children) {
      const currentPath = { node: child, path: [...path, node] };
      currentPath.node.children && delete currentPath.node.children;
      stack.push();
    }
  }

  return { node: null, path: [] };
}

/**
 * 根据id查找树中的节点
 */
export function findTreeNodeByKeyValueIterative<T extends Record<string, any>>(
  data: T[],
  value: string | number,
  key = 'id',
): T | null {
  const stack: T[] = [...data];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node[key] === value) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push(child);
      }
    }
  }

  return null;
}

/**
 * 查找树中的节点，根据回调函数判断
 */
export function findTreeNodeIterative<T extends Record<string, any>>(
  data: T[],
  cb: (node: T) => boolean,
): T | null {
  const stack: T[] = [...data];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (cb(node)) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push(child);
      }
    }
  }

  return null;
}

/**
 * 在树结构中迭代查找满足条件的节点的父节点
 *
 * @description
 * 该函数使用迭代方式遍历树结构，查找满足指定条件的节点的父节点。
 * 适用于需要在大型树结构中快速定位特定节点的父节点的场景。
 *
 * @param {T[]} data - 树结构数据数组
 * @param {(node: T) => boolean} isParentCallback - 判断是否为目标节点的回调函数
 * @returns {T | null} 返回满足条件的节点的父节点，如果未找到则返回null
 *
 * @example
 * const treeData = [
 *   { id: 1, children: [
 *     { id: 2, name: 'target' },
 *     { id: 3 }
 *   ]},
 *   { id: 4, children: [{ id: 5 }] }
 * ];
 *
 * const parentNode = findParentNodeIterative(treeData, node => node.name === 'target');
 * console.log(parentNode); // 输出: { id: 1, children: [...] }
 */
export function findParentNodeIterative<T extends Record<string, any>>(
  data: T[],
  isParentCallback: (node: T) => boolean,
): T | null {
  const stack: T[] = [...data];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (currentNode.children && currentNode.children.length > 0) {
      for (const child of currentNode.children) {
        if (isParentCallback(child)) {
          return currentNode;
        }
        stack.push(child);
      }
    }
  }

  return null;
}
