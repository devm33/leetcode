import { assert } from "./test";


// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}


/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  if (root === null) return '';
  const output: number[] = [];
  const stack: [TreeNode, number][] = [[root, 0]];
  while (stack.length > 0) {
    const [node, index] = stack.shift()!;
    output[index] = node.val;
    if (node.left !== null) stack.push([node.left, 2 * index + 1]);
    if (node.right !== null) stack.push([node.right, 2 * index + 2]);
  }
  return output.join(',');
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (data === '') return null;
  const array = data.split(',');
  const root = new TreeNode(Number(array[0]));
  const stack: [TreeNode, number][] = [[root, 0]];
  while (stack.length > 0) {
    const [node, index] = stack.shift()!;
    const left = 2 * index + 1;
    if (left < array.length && array[left]) {
      node.left = new TreeNode(Number(array[left]));
      stack.push([node.left, left]);
    }
    const right = 2 * index + 2;
    if (right < array.length && array[right]) {
      node.right = new TreeNode(Number(array[right]));
      stack.push([node.right, right]);
    }
  }
  return root;
}

assert(serialize,
  new TreeNode(
    1,
    new TreeNode(2),
    new TreeNode(
      3,
      new TreeNode(4),
      new TreeNode(5)
    )
  )
).equals('1,2,3,,,4,5');

assert(serialize, deserialize('1,2,3,,,4,5')).equals('1,2,3,,,4,5');