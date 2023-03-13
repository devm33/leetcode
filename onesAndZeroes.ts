import { assert } from './test';

// https://leetcode.com/problems/ones-and-zeroes/
function findMaxForm(strs: string[], m: number, n: number): number {
  let dp: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (const str of strs) {
    const z = str.replace(/1/g, '').length;
    const o = str.length - z;
    if (z > m || o > n) continue;
    for (let i = m; i >= z; i--) {
      for (let j = n; j >= o; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);
      }
    }
  }
  return Math.max(...dp.flat());
}

assert(findMaxForm, ['10', '0001', '111001', '1', '0'], 5, 3).equals(4);
assert(findMaxForm, ['10', '0', '1'], 1, 1).equals(2);