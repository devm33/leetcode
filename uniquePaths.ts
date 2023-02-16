// https://leetcode.com/problems/unique-paths/

// m is rows, n is cols
function uniquePaths(m: number, n: number): number {
  const count: number[][] = Array(m).fill(0).map(() => Array(n).fill(1));
  for (var r = 1; r < m; r++) {
    for (var c = 1; c < n; c++) {
      count[r][c] = count[r-1][c] + count[r][c-1];
    }
  }
  return count[m - 1][n - 1];
};

console.log('m = 3, n = 2 actual:', uniquePaths(3,2), 'expected:', 3);