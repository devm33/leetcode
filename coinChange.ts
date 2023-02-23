// https://leetcode.com/problems/coin-change

function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;

  // BFS approach
  const seen = new Set<string>();
  const stack = [Array(coins.length).fill(0)];

  while (stack.length > 0) {
    const cur = stack.shift()!;
    seen.add(cur.toString());
    const value = getValue(coins, cur);
    if (value === amount) return cur.reduce((c, a) => c + a);
    if (value > amount) continue;
    stack.push(...getNeighbors(coins, seen, cur))
  }

  return -1;
}

function getValue(coins: number[], count: number[]): number {
  let sum = 0;
  for (let i = 0; i < coins.length; i++) {
    sum += coins[i] * count[i];
  }
  return sum;
}

function getNeighbors(coins: number[], seen: Set<string>, count: number[]):
  number[][] {
  const output: number[][] = [];
  for (let i = 0; i < coins.length; i++) {
    const neighbor = count.slice();
    neighbor[i]++;
    if (!seen.has(neighbor.toString())) {
      output.push(neighbor);
    }
  }
  return output
}


console.assert(coinChange([1, 2, 5], 11) === 3);
console.assert(coinChange([2], 3) === -1);
console.assert(coinChange([1], 0) === 0);