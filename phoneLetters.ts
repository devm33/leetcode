// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

const letters = new Map<string, string[]>([
  ['2', ['a', 'b', 'c']],
  ['3', ['d', 'e', 'f']],
  ['4', ['g', 'h', 'i']],
  ['5', ['j', 'k', 'l']],
  ['6', ['m', 'n', 'o']],
  ['7', ['p', 'q', 'r', 's']],
  ['8', ['t', 'u', 'v']],
  ['9', ['w', 'x', 'y', 'z']],
]);

function letterCombinations(digits: string): string[] {
  if (digits === '') return [];
  let output = letters.get(digits[0])!;
  if (digits.length === 1) return output;
  // const suffixes = letterCombinations(digits.substring(1));
  for (let d of digits.substring(1)) {
    output = Array.from(combineOptions(letters.get(d)!, output));
  }
  return output;
}

function* combineOptions(options: string[], prefixes: string[]):
  Generator<string> {
  for (let p of prefixes) {
    for (let o of options) {
      yield p + o;
    }
  }
}

function test(digits: string, expected: string[]) {
  const output = letterCombinations(digits).toString();
  const e = expected.toString();
  if (output == e) {
    console.log('pass', digits, output);
  } else {
    console.log('fail', digits, output, e);
  }
}

test("23", ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]);