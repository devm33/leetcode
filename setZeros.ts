/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                setNonZeroRowNull(matrix[i]);
                setNonZeroColNull(matrix, j);
            }
        }
    }
    zeroOutAllNulls(matrix);
};

function zeroOutAllNulls(matrix: number[][]) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === null) {
                matrix[i][j] = 0;
            }
        }
    }
}

function setNonZeroColNull(matrix: (number | null)[][], col: number) {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][col] !== 0) {
            matrix[i][col] = null;
        }
    }
}

function setNonZeroRowNull(row: (number | null)[]) {
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== 0) {
            row[i] = null;
        }
    }
}
