function lengthOfLongestSubstring(s: string): number {
    let longest = 0;
    let start = 0;
    let end = 0;
    const seen = new Map<string, number>();
    while (end < s.length) {
        const c = s[end];
        if (!seen.has(c) || seen.get(c)! < start) {
            seen.set(c, end);
            longest = Math.max(longest, end - start + 1);
        } else {
            start = seen.get(c)! + 1;
            seen.set(c, end);
        }
        end++;
    }
    return longest;
};