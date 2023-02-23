// https://leetcode.com/problems/sort-colors/

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  let c0 = 0, c1 = 0;
  for (let n of nums) {
    if (n === 0) {
      c0++;
    } else if (n === 1) {
      c1++;
    }
  }
  for (let i = 0; i < c0; i++) nums[i] = 0;
  for (let i = c0; i < c0 + c1; i++) nums[i] = 1;
  for (let i = c0 + c1; i < nums.length; i++) nums[i] = 2;
};

let o = [2, 0, 2, 1, 1, 0];
sortColors(o);
console.log([2, 0, 2, 1, 1, 0], o, [0, 0, 1, 1, 2, 2]);