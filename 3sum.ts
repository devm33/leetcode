
function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) return [];
  nums.sort((a, b) => a - b);
  const output: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // while(nums[i] === nums[i+1]) i++; // Skip duplicates?
    let a = nums[i];
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      let b = nums[j];
      let c = nums[k];
      let s = a + b + c;
      if (s === 0) {
        output.push([a, b, c]);
        while (nums[j] === nums[j + 1]) j++; // Skip duplicates
        j++; // Move one after duplicates.
      } else if (s > 0) {
        k--;
      } else {
        j++;
      }
    }
  }
  const deduped: number[][] = [];
  for (let i = 0; i < output.length; i++) {
    if (noDupes(output, i)) {
      deduped.push(output[i]);
    }
  }
  return deduped;
}

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

// console.log(threeSum([-4, -8, 7, 13, 10, 1, -14, -13, 0, 8, 6, -13, -5, -4, -12, 2, -11, 7, -5, 0, -9, -14, -8, -9, 2, -7, -13, -3, 13, 9, -14, -6, 8, 1, 14, -5, -13, 8, -10, -5, 1, 11, -11, 3, 14, -8, -10, -12, 6, -8, -5, 13, -15, 2, 11, -5, 10, 6, -1, 1, 0, 0, 2, -7, 8, -6, 3, 3, -13, 8, 5, -5, -3, 9, 5, -4, -14, 11, -8, 7, 10, -6, -3, 11, 12, -14, -9, -1, 7, 5, -15, 14, 12, -5, -8, -2, 4, 2, -14, -2, -12, 6, 8, 0, 0, -2, 3, -7, -14, 2, 7, 12, 12, 12, 0, 9, 13, -2, -15, -3, 10, -14, -4, 7, -12, 3, -10]));