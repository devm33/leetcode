import { assert } from "./test";

// https://leetcode.com/problems/perfect-squares/
function numSquares(n: number): number {
  const nsqrt = Math.floor(Math.sqrt(n));
  const squares = Array(nsqrt + 1).fill(0).map((v, i) => (i + 1) * (i + 1));
  const counts = Array(n + 1).fill(-1);
  for (let i = 1; i <= n; i++) {
    for (const square of squares) {
      if (square > i) break;
      if (square === i) {
        counts[i] = 1;
        break;
      }
      const d = i - square;
      if (counts[d] !== -1) {
        if (counts[i] === -1 || counts[i] > counts[d] + 1) {
          counts[i] = counts[d] + 1;
        }
      }
    }
  }
  return counts[n];
}


assert(numSquares, 12).equals(3);
assert(numSquares, 13).equals(2);
assert(numSquares, 43).equals(3);