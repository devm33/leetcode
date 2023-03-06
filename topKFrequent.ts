import { test } from './test';

// https://leetcode.com/problems/top-k-frequent-elements/

function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }
  return Array.from(count.entries())
    .sort((kv1, kv2) => kv2[1] - kv1[1])
    .map((kv) => kv[0])
    .slice(0, k);
};


test(topKFrequent, [[1, 1, 1, 2, 2, 3], 2], [1, 2]);
test(topKFrequent, [[1], 1], [1]);