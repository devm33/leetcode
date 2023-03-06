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

function test(nums: number[], k: number, expected: number[]) {
  const actual = topKFrequent(nums, k);
  if (actual.toString() === expected.toString()) {
    console.log('pass', nums, k, expected);
  } else {
    console.log('fail', nums, k, expected, actual);
  }
}

test([1, 1, 1, 2, 2, 3], 2, [1, 2]);
test([1], 1, [1]);