
function threeSum(nums: number[]): number[][] {
  const partials = new Map<number, [number, number][]>();
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const p = 0 - nums[i] - nums[j];
      if (partials.has(p)) {
        partials.get(p)!.push([i, j]);
      } else {
        partials.set(p, [[i, j]]);
      }
    }
  }
  let output: number[][] = [];
  for (let k = 0; k < nums.length; k++) {
    const p = partials.get(nums[k]);
    if (!p) continue;
    output = output.concat(p.filter(a => !a.includes(k))
      .map(a => [...a.map(i => nums[i]), nums[k]]));
  }
  const deduped: number[][] = [];
  for (let i = 0; i < output.length; i++) {
    if (noDupes(output, i)) {
      deduped.push(output[i]);
    }
  }
  return deduped;
};

/** Return true if no arrays after index in input match array at index. */
function noDupes(arrs: number[][], index: number): boolean {
  for (let i = index + 1; i < arrs.length; i++) {
    if (equalArrays(arrs[index], arrs[i])) {
      return false;
    }
  }
  return true;
}

/** Return true if arrays contain the same numbers ignoring order. */
function equalArrays(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const output = threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]);
const expected = [[-4, 0, 4], [-4, 1, 3], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, -1, 2], [-1, 0, 1]];
console.log(output, expected, output.length == expected.length, expected.every(e => output.some(o => equalArrays(o, e))));

console.log(threeSum([-4, -8, 7, 13, 10, 1, -14, -13, 0, 8, 6, -13, -5, -4, -12, 2, -11, 7, -5, 0, -9, -14, -8, -9, 2, -7, -13, -3, 13, 9, -14, -6, 8, 1, 14, -5, -13, 8, -10, -5, 1, 11, -11, 3, 14, -8, -10, -12, 6, -8, -5, 13, -15, 2, 11, -5, 10, 6, -1, 1, 0, 0, 2, -7, 8, -6, 3, 3, -13, 8, 5, -5, -3, 9, 5, -4, -14, 11, -8, 7, 10, -6, -3, 11, 12, -14, -9, -1, 7, 5, -15, 14, 12, -5, -8, -2, 4, 2, -14, -2, -12, 6, 8, 0, 0, -2, 3, -7, -14, 2, 7, 12, 12, 12, 0, 9, 13, -2, -15, -3, 10, -14, -4, 7, -12, 3, -10]));