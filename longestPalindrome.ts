function longestPalindrome(s: string): string {
    let output = s[0]; // base case
    for (let i = 1; i < s.length - 1; i++) {
        let left = i - 1;
        let right = i + 1
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > output.length) {
                output = s.substring(left, right + 1);
            }
            left--;
            right++;
        }
    }
    for (let i = 0; i < s.length; i++) {
        let left = i;
        let right = i + 1
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > output.length) {
                output = s.substring(left, right + 1);
            }
            left--;
            right++;
        }
    }
    return output;
};

/*
 
s = "babad"
 
output = "b"
 
i = 1
left = 0
right = 2
s[left] = b
s[right] = b
2 - 0 + 1 = 3 > 1
output = "bab"
 
 
 
 
 
 
*/