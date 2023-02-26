// https://leetcode.com/problems/coin-change

function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  coins.sort((a, b) => a - b);
  const fewestCoins = Array<number>(amount + 1).fill(-1);
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin > i) break;
      if (coin === i) {
        fewestCoins[i] = 1;
        break;
      }
      const d = i - coin;
      if (d > 0 && fewestCoins[d] !== -1) {
        if (fewestCoins[i] === -1 || fewestCoins[i] > fewestCoins[d] + 1) {
          fewestCoins[i] = fewestCoins[d] + 1;
        }
      }
    }
  }
  return fewestCoins[amount];
}


console.assert(coinChange([1, 2, 5], 11) === 3);
console.assert(coinChange([2], 3) === -1);
console.assert(coinChange([1], 0) === 0);