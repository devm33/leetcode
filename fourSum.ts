import { test } from './test';

// https://leetcode.com/problems/4sum/
function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const output: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const w = nums[i];
    output.push(...(threeSum(nums.slice(i + 1), target - w)
      .map(([x, y, z]) => [w, x, y, z])));
  }
  return removeDuplicates(output);
}

test(fourSum, [[1, 0, -1, 0, -2, 2], 0],
  [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]);
test(fourSum, [[2, 2, 2, 2, 2], 8], [[2, 2, 2, 2]]);
test(fourSum, [[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 8],
  [[2, 2, 2, 2]])

// Assumes nums is sorted
function threeSum(nums: number[], target: number): number[][] {
  const output: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const x = nums[i];
    output.push(...(twoSum(nums.slice(i + 1), target - x)
      .map(([y, z]) => [x, y, z])));
  }
  return removeDuplicates(output);
}

test(threeSum, [[1, 2, 3, 4, 5], 6], [[1, 2, 3]]);
test(threeSum, [[1, 2, 3, 4, 5], 5], []);
test(threeSum, [[2, 2, 2, 2, 2], 6], [[2, 2, 2]]);

// Assumes nums is sorted
function twoSum(nums: number[], target: number): number[][] {
  const output: [number, number][] = [];
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let s = nums[left] + nums[right];
    if (s === target) {
      output.push([nums[left], nums[right]]);
      left++;
    } else if (s < target) {
      left++;
    } else {
      right--;
    }
  }
  return removeDuplicates(output);
}

test(twoSum, [[1, 2, 3, 4, 5], 5], [[1, 4], [2, 3]]);
test(twoSum, [[1, 2, 3, 4, 5], 6], [[1, 5], [2, 4]]);
test(twoSum, [[1, 2, 3, 4, 5], 10], []);
test(twoSum, [[2, 2, 2, 2], 4], [[2, 2]]);

function removeDuplicates(values: number[][]): number[][] {
  const strings = values.map(v => v.toString());
  const uniques = Array.from(new Set(strings));
  return uniques.map(str => str.split(',').map(s => Number(s)));
}