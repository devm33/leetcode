import { assert } from "./test";

// https://leetcode.com/problems/minimum-cost-for-tickets/
function mincostTickets(days: number[], costs: number[]): number {
  const minCost = Array(days.length).fill(Number.MAX_SAFE_INTEGER);
  minCost[0] = costs[0];
  for (let i = 0; i < days.length; i++) {
    const prevCost = i > 0 ? minCost[i - 1] : 0;
    minCost[i] = Math.min(minCost[i], prevCost + costs[0]);
    const i7 = findNDaysIndex(days, i, 7);
    minCost[i7] = Math.min(minCost[i7], prevCost + costs[1]);
    const i30 = findNDaysIndex(days, i, 30);
    minCost[i30] = Math.min(minCost[i30], prevCost + costs[2]);
  }
  return minCost.pop();
}

function findNDaysIndex(days: number[], start: number, duration: number): number {
  let i = 0;
  while (i < days.length && days[i] < days[start] + duration) i++;
  return i - 1;
}

assert(mincostTickets, [1, 4, 6, 7, 8, 20], [2, 7, 15]).equals(11);
assert(mincostTickets, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]).equals(17);