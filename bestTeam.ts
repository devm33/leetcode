function bestTeamScore(scores: number[], ages: number[]): number {
    let max = 0;
    for (let i = 0; i < scores.length; i++) {
        let sum = scores[i];
        console.log(i, sum);
        for (let j = i + 1; j < scores.length; j++) {
            if (!isConflict(scores, ages, i, j)) {
                sum += scores[j];
                console.log(j, 'no conflict between', scores[i], ages[i], 'and', scores[j], ages[j], 'new sum', sum);
            }
        }
        max = Math.max(max, sum);
        console.log('max', max);
    }
    return max;
}

function isConflict(scores: number[], ages: number[], i: number, j: number): boolean {
    if (ages[i] === ages[j]) return false;
    if (ages[i] > ages[j]) {
        return scores[i] < scores[j];
    }
    return scores[i] > scores[j];
}

const out = bestTeamScore([1, 3, 7, 3, 2, 4, 10, 7, 5], [4, 5, 2, 1, 1, 2, 4, 1, 4]);
console.log('output', out, 'expected', 29);

/*

scores = [1, 3, 7, 3, 2, 4, 10, 7, 5]
ages =   [4, 5, 2, 1, 1, 2, 4, 1, 4]
max = 0

i = 0
sum = 1
j = 1, 




*/