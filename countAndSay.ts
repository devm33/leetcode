function countAndSay(n: number): string {
    if (n === 1) return "1";
    const s = countAndSay(n - 1);
    let output = '';
    let i = 0;
    while (i < s.length) {
        let j = i + 1;
        while (s[i] === s[j]) j++;
        output += `${j - i}${s[i]}`;
        i = j;
    }
    return output;
};