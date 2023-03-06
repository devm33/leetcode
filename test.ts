
/** Test a generic function with provided args and expected output. */
export function test<O extends Object, T extends any[]>(
  fn: (...args: T) => O,
  args: T,
  expected: O,
) {
  const actual = fn(...args);
  if (actual.toString() === expected.toString()) {
    console.log('PASS', 'args:', args, 'expected:', expected);
  } else {
    console.log('FAIL', 'args:', args, 'expected:', expected, 'actual:',
      actual);
  }
}