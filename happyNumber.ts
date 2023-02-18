// Happy number: https://leetcode.com/problems/happy-number/

function isHappy(n: number): boolean {
  const seen = new Set();
  let cur = n;
  while (cur !== 1 && !seen.has(cur)) {
    seen.add(cur);
    cur = sumSquares(cur);
  }
  return cur === 1;
}

function sumSquares(n: number): number {
  return getDigits(n).map(d => d * d).reduce((a, b) => a + b);
}

function getDigits(n: number): number[] {
  if (n == 0) return [0];
  let c = n;
  const output = [];
  while (true) {
    output.push(c % 10);
    if (c < 10) break;
    c = Math.floor(c / 10);
  }
  return output;
}

console.log(2, isHappy(2), false);
console.log(19, isHappy(19), true);