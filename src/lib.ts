export type UnknownObject = Record<string, unknown>;

export type TableRowRecord = Record<string, string>;

export interface TreeNode {
  data: TableRowRecord;
  kids: { [key in string]?: { records: TreeNode[] } };
}

export function isObjectEqual<T extends UnknownObject = TableRowRecord>(
  first: T,
  second: T
) {
  return first === second;
}

export function deleteNode(node: TreeNode, tree: TreeNode[]): TreeNode[] {
  return tree.reduce<TreeNode[]>((prev, item, index) => {
    const { data, kids } = item;
    if (!isObjectEqual(data, node.data)) {
      const newKids: TreeNode["kids"] = {};
      for (const [key, value] of Object.entries(kids)) {
        if (value && value.records) {
          const newRecords = deleteNode(node, value.records);
          if (newRecords.length) {
            newKids[key] = { records: newRecords };
          }
        }
      }
      prev.push({ data, kids: newKids });
    }
    return prev;
  }, []);
}
