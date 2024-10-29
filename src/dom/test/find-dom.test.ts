import { describe, it, expect, beforeEach } from 'vitest';
import {
  getPopupContainer,
  getParentsUntil,
  getAncestors,
  getSiblingByPosition,
} from '../find-dom';

describe('DOM 查找函数测试', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 在每个测试前重置 DOM 结构
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('getPopupContainer', () => {
    it('当提供节点时应返回其父元素', () => {
      const child = document.createElement('div');
      container.appendChild(child);

      const result = getPopupContainer(child);
      expect(result).toBe(container);
    });

    it('当未提供节点时应返回 document.body', () => {
      const result = getPopupContainer();
      expect(result).toBe(document.body);
    });

    it('当节点没有父元素时应返回 document.body', () => {
      const orphanNode = document.createElement('div');
      const result = getPopupContainer(orphanNode);
      expect(result).toBe(document.body);
    });
  });

  describe('getParentsUntil', () => {
    it('应返回直到匹配选择器的所有父元素', () => {
      // 创建测试 DOM 结构
      const html = `
        <div class="container">
          <div class="level-1">
            <div class="level-2">
              <div class="target"></div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      const target = container.querySelector('.target') as Element;
      const parents = getParentsUntil(target, '.container');

      expect(parents.length).toBe(3);
      expect(parents[2].classList.contains('level-2')).toBe(true);
      expect(parents[1].classList.contains('level-1')).toBe(true);
      expect(parents[0].classList.contains('container')).toBe(true);
    });

    it('当未找到匹配选择器的元素时应返回空数组', () => {
      const target = document.createElement('div');
      container.appendChild(target);

      const parents = getParentsUntil(target, '.non-existent');
      expect(parents).toEqual([]);
    });
  });

  describe('getAncestors', () => {
    it('应返回所有祖先元素', () => {
      // 创建测试 DOM 结构
      const html = `
        <div class="level-1">
          <div class="level-2">
            <div class="level-3">
              <div class="target"></div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      const target = container.querySelector('.target') as Element;
      const ancestors = getAncestors(target);

      // 验证祖先元素的数量和顺序
      expect(ancestors.length).toBeGreaterThanOrEqual(4); // 至少包含 level-1,2,3 和 container

      const lastIndex = ancestors.length - 1;
      expect(ancestors[lastIndex].classList.contains('level-3')).toBe(true);
      expect(ancestors[lastIndex - 1].classList.contains('level-2')).toBe(true);
      expect(ancestors[lastIndex - 2].classList.contains('level-1')).toBe(true);
    });
  });

  describe('getSiblingByPosition', () => {
    beforeEach(() => {
      // 创建测试 DOM 结构
      const html = `
        <div class="sibling">First</div>
        <div class="sibling">Second</div>
        <div class="sibling target">Target</div>
        <div class="sibling">Fourth</div>
        <div class="sibling">Fifth</div>
      `;
      container.innerHTML = html;
    });

    it('应正确获取后面的兄弟元素', () => {
      const target = container.querySelector('.target') as HTMLElement;
      const nextSibling = getSiblingByPosition(target, 1, '.sibling');

      expect(nextSibling?.textContent).toBe('Fourth');
    });

    it('应正确获取前面的兄弟元素', () => {
      const target = container.querySelector('.target') as HTMLElement;
      const previousSibling = getSiblingByPosition(target, -1, '.sibling');

      expect(previousSibling?.textContent).toBe('Second');
    });

    it('当超出范围时应返回 null', () => {
      const target = container.querySelector('.target') as HTMLElement;
      const nonExistentSibling = getSiblingByPosition(target, 5, '.sibling');

      expect(nonExistentSibling).toBeNull();
    });

    it('当元素没有父节点时应返回 null', () => {
      const orphanElement = document.createElement('div');
      const result = getSiblingByPosition(orphanElement, 1, '.sibling');

      expect(result).toBeNull();
    });
  });
});
