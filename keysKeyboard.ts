import { assert } from "./test";

// https://leetcode.com/problems/2-keys-keyboard/
function minSteps(n: number): number {
  if (n === 1) return 0;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = n - 1; i > 0; i--) {
    const diff = n - i;
    if (diff % i !== 0) continue;
    const steps = diff / i;
    if (steps > min) continue;
    const next = steps /* pastes */ + 1 /* copy */ + minSteps(i);
    min = Math.min(min, next);
  }
  return min;
}


assert(minSteps, 3).equals(3);
assert(minSteps, 1).equals(0);
assert(minSteps, 681).equals(230);