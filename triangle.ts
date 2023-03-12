import { test } from "./test";

// https://leetcode.com/problems/triangle
function minimumTotal(triangle: number[][]): number {
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c < triangle[r].length; c++) {
      triangle[r][c] += Math.min(triangle[r + 1][c], triangle[r + 1][c + 1]);
    }
  }
  return triangle[0][0];
}

test(minimumTotal, [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11);