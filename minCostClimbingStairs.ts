// https://leetcode.com/problems/min-cost-climbing-stairs/
function minCostClimbingStairs(cost: number[]): number {
  for(let i = 2; i < cost.length; i++) {
    cost[i] += Math.min(cost[i-1], cost[i-2]);
  }
  return Math.min(...cost.slice(-2));
}
