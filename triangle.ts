import { test } from "./test";

// https://leetcode.com/problems/triangle
function minimumTotal(triangle: number[][]): number {
  return triangle.reduceRight((prev, row) => 
    row.map((val, i) => val + Math.min(prev[i], prev[i + 1])))[0];
}

test(minimumTotal, [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11);