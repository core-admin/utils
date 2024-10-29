import {
  removeEmptyChildrenIterative,
  buildTree,
  findTreeNodeAndPathByIdIterative,
  findTreeNodeByKeyValueIterative,
  findTreeNodeIterative,
  findParentNodeIterative,
} from '../tree';

describe('Tree Operations', () => {
  // 测试数据
  const sampleTreeData = [
    {
      id: 1,
      name: 'Root',
      children: [
        {
          id: 2,
          name: 'Child 1',
          children: [
            { id: 4, name: 'Grandchild 1', children: [] },
            { id: 5, name: 'Grandchild 2' },
          ],
        },
        {
          id: 3,
          name: 'Child 2',
          children: [],
        },
      ],
    },
  ];

  describe('removeEmptyChildrenIterative', () => {
    test('应删除空的 children 数组', () => {
      const data = JSON.parse(JSON.stringify(sampleTreeData));
      removeEmptyChildrenIterative(data);

      expect(data[0].children[1]).not.toHaveProperty('children');
      expect(data[0].children[0].children[0]).not.toHaveProperty('children');
    });

    test('不应删除有子节点的 children 数组', () => {
      const data = JSON.parse(JSON.stringify(sampleTreeData));
      removeEmptyChildrenIterative(data);

      expect(data[0]).toHaveProperty('children');
      expect(data[0].children[0]).toHaveProperty('children');
    });

    test('处理空数组', () => {
      const emptyData: any[] = [];
      removeEmptyChildrenIterative(emptyData);
      expect(emptyData).toEqual([]);
    });
  });

  describe('buildTree', () => {
    const flatData = [
      { id: 1, pid: 0, name: 'Root' },
      { id: 2, pid: 1, name: 'Child 1' },
      { id: 3, pid: 1, name: 'Child 2' },
      { id: 4, pid: 2, name: 'Grandchild 1' },
    ];

    test('基本树构建', () => {
      const tree = buildTree(flatData);
      expect(tree).toHaveLength(1);
      expect(tree[0].children).toHaveLength(2);
      expect(tree[0].children[0].children).toHaveLength(1);
    });

    test('自定义键构建树', () => {
      const customData = [
        { nodeId: 1, parentId: 0, name: 'Root' },
        { nodeId: 2, parentId: 1, name: 'Child' },
      ];
      const tree = buildTree(customData, {
        selfKey: 'nodeId',
        parentKey: 'parentId',
      });
      expect(tree).toHaveLength(1);
      expect(tree[0].children).toHaveLength(1);
    });

    test('处理空数组', () => {
      const tree = buildTree([]);
      expect(tree).toEqual([]);
    });
  });

  describe('findTreeNodeAndPathByIdIterative', () => {
    test('查找存在的节点及其路径', () => {
      const result = findTreeNodeAndPathByIdIterative(sampleTreeData, 4);
      expect(result.node).toBeTruthy();
      expect(result.node?.id).toBe(4);
      expect(result.path).toHaveLength(2);
      expect(result.path[0].id).toBe(1);
      expect(result.path[1].id).toBe(2);
    });

    test('查找不存在的节点', () => {
      const result = findTreeNodeAndPathByIdIterative(sampleTreeData, 999);
      expect(result.node).toBeNull();
      expect(result.path).toEqual([]);
    });
  });

  describe('findTreeNodeByKeyValueIterative', () => {
    test('按 ID 查找节点', () => {
      const node = findTreeNodeByKeyValueIterative(sampleTreeData, 3);
      expect(node).toBeTruthy();
      expect(node?.id).toBe(3);
    });

    test('按自定义键查找节点', () => {
      const node = findTreeNodeByKeyValueIterative(sampleTreeData, 'Child 1', 'name');
      expect(node).toBeTruthy();
      expect(node?.name).toBe('Child 1');
    });

    test('查找不存在的节点', () => {
      const node = findTreeNodeByKeyValueIterative(sampleTreeData, 999);
      expect(node).toBeNull();
    });
  });

  describe('findTreeNodeIterative', () => {
    test('使用回调函数查找节点', () => {
      const node = findTreeNodeIterative(sampleTreeData, node => node.name === 'Grandchild 1');
      expect(node).toBeTruthy();
      expect(node?.id).toBe(4);
    });

    test('查找不存在的节点', () => {
      const node = findTreeNodeIterative(sampleTreeData, node => node.name === 'NonExistent');
      expect(node).toBeNull();
    });

    test('使用复杂条件查找节点', () => {
      const node = findTreeNodeIterative(
        sampleTreeData,
        node => node.id > 3 && node.name.includes('child'),
      );
      expect(node).toBeTruthy();
      expect(node?.id).toBeGreaterThan(3);
    });
  });

  describe('findParentNodeIterative', () => {
    test('查找存在节点的父节点', () => {
      const parent = findParentNodeIterative(sampleTreeData, node => node.id === 4);
      expect(parent).toBeTruthy();
      expect(parent?.id).toBe(2);
    });

    test('查找根节点的父节点', () => {
      const parent = findParentNodeIterative(sampleTreeData, node => node.id === 1);
      expect(parent).toBeNull();
    });

    test('查找不存在节点的父节点', () => {
      const parent = findParentNodeIterative(sampleTreeData, node => node.id === 999);
      expect(parent).toBeNull();
    });

    test('使用复杂条件查找父节点', () => {
      const parent = findParentNodeIterative(sampleTreeData, node =>
        node.name.includes('Grandchild'),
      );
      expect(parent).toBeTruthy();
      expect(parent?.name).toBe('Child 1');
    });
  });
});
