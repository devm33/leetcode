import { test } from "./test";

// https://leetcode.com/problems/triangle
function minimumTotal(triangle: number[][]): number {
  const minCost: number[][] = Array(triangle.length);
  for (let r = 0; r < triangle.length; r++) {
    minCost[r] = Array(triangle[r].length).fill(Number.MAX_VALUE);
  }
  minCost[0][0] = triangle[0][0];
  for (let r = 1; r < triangle.length; r++) {
    for (let c = 0; c < triangle[r].length; c++) {
      if (c === 0) {
        minCost[r][c] = triangle[r][c] + minCost[r - 1][c];
      } else if (c === triangle[r].length - 1) {
        minCost[r][c] = triangle[r][c] + minCost[r - 1][c - 1];
      } else {
        minCost[r][c] = triangle[r][c] +
          Math.min(minCost[r - 1][c], minCost[r - 1][c - 1]);
      }
    }
  }
  return Math.min(...minCost[minCost.length - 1]);
}

test(minimumTotal, [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11);