/**
 * @description: 扁平化数组转tree
 * @param {*} list
 * @return {*}
 */
export function arr2Tree<T>(list: T[], { id = "id", children = "children", pid = "pid" } = {}): any {
  const nodeMap = new Map(),
    result = [];
  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
    const parent = nodeMap.get(node[pid]);
    (parent ? parent.children : result).push(node);
  }
  return result;
}
