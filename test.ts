
/** Test a generic function with provided args and expected output. */
export function test<O extends Object, T extends any[]>(
  fn: (...args: T) => O,
  args: T,
  expected: O,
) {
  const actual = fn(...args);
  if (actual.toString() === expected.toString()) {
    console.log('\u001B[32mPASS\u001B[39m', 'args:', args,
      'expected:', expected);
  } else {
    console.log('\u001B[31mFAIL\u001B[39m', 'args:', args,
      'expected:', expected, 'actual:', actual);
  }
}