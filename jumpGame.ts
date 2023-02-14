// https://leetcode.com/problems/jump-game/

function canJump(nums: number[]): boolean {
  if (nums.length === 1) return true;
  const canReach: boolean[] = new Array(nums.length);
  for (var i = nums.length - 2; i >= 0; i--) {
    const maxJump = nums[i];
    if (maxJump + i >= nums.length - 1) {
      canReach[i] = true;
    } else if (maxJump === 0) {
      canReach[i] = false;
    } else {
      canReach[i] = canReach.slice(i + 1, i + maxJump + 1).includes(true);
    }
  }
  return canReach[0];
};


console.log(canJump([2, 3, 1, 1, 4]), 'should be true');
console.log(canJump([3, 2, 1, 0, 4]), 'should be false');

