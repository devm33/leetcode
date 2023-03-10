import { test } from './test';

/** There is a new alien language which uses the latin alphabet. However, the
 * order among letters are unknown to you. You receive a list of non-empty words
 * from the dictionary, where words are sorted lexicographically by the rules of
 * this new language. Derive the order of letters in this language.
 */
function determineOrder(lexicon: string[]): string {
  const letters = getUniqueLetters(lexicon);
  const parents = new Map<string, Set<string>>();
  for (const letter of letters) {
    parents.set(letter, new Set());
  }

  for (let i = 0; i < lexicon.length - 1; i++) {
    const diff = findFirstLetterDifference(lexicon[i], lexicon[i + 1]);
    if (diff === null) continue;
    const [first, second] = diff;
    if (parents.get(first)!.has(second)) {
      return ''; // Invalid order
    }
    parents.get(second)!.add(first);
  }
  let output = '';
  const remainingLetters = new Set<string>(letters);
  while (remainingLetters.size > 0) {
    const root = findRootLetter(remainingLetters, parents);
    if (root === null) {
      return ''; // Invalid order
    }
    output += root;
    remainingLetters.delete(root);
    for (const set of parents.values()) {
      set.delete(root);
    }
  }
  return output;
}

function findRootLetter(letters: Set<string>, parents: Map<string, Set<string>>): string | null {
  for (const letter of letters) {
    if (parents.get(letter)?.size === 0) {
      return letter;
    }
  }
  return null;
}

function findFirstLetterDifference(first: string, second: string): [string, string] | null {
  for (let i = 0; i < first.length; i++) {
    if (i >= second.length) break;
    if (first[i] !== second[i]) {
      return [first[i], second[i]];
    }
  }
  return null;
}

function getUniqueLetters(lexicon: string[]): string {
  const uniqueLetters = new Set<string>();
  for (const word of lexicon) {
    for (const letter of word) {
      uniqueLetters.add(letter);
    }
  }
  return Array.from(uniqueLetters).join('');
}


test(determineOrder, [['wrt', 'wrf', 'er', 'ett', 'rftt']], 'wertf');
test(determineOrder, [['z', 'x']], 'zx');
test(determineOrder, [['z', 'x', 'z']], '');
test(determineOrder, [['baa', 'abcd', 'abca', 'cab', 'cad']], 'bdac');
test(determineOrder, [['caa', 'aaa', 'aab']], 'cab');