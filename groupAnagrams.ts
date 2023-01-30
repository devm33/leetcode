function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (let s of strs) {
        const sorted = s.split('').sort().join('');
        if (map.has(sorted)) {
            map.get(sorted)!.push(s);
        } else {
            map.set(sorted, [s]);
        }
    }
    return Array.from(map.values());
};