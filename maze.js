
const solution = (maze, startRow, startCol, destRow, destCol) => {
    const stack = [[startRow, startCol]];
    const seen = [];
    for (let r = 0; r < maze.length; r++) {
        seen.push(new Array(maze[r].length).fill(false));
    }
    while (stack.length > 0) {
        const [r, c] = stack.shift();
        let v = maze[r][c];
        maze[r][c] = 3;
        maze[r][c] = v;
        if (r === destRow && c === destCol) return true;
        if (seen[r][c] === true) continue;
        seen[r][c] = true;
        stack.push(...getNeighbors(maze, seen, r, c));
    }
    return false;
};

function getNeighbors(maze, seen, row, col) {
    return [
        [row - 1, col], // Up
        [row + 1, col], // Down
        [row, col - 1], // Left
        [row, col + 1], // Right
    ].filter(([r, c]) => r >= 0 && r < maze.length && c >= 0 && c < maze[r].length)
        .filter(([r, c]) => maze[r][c] === 0)
        .filter(([r, c]) => seen[r][c] === false);
}

const maze = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0],
];

console.log(solution(maze, 0, 0, 4, 4));