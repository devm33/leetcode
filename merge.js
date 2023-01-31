const solution = (array) => {
    function merge(left, right) {
        let merged = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                merged.push(left[i++]);
            } else {
                merged.push(right[j++]);
            }
        }
        while (i < left.length) {
            merged.push(left[i++]);
        }
        while (j < right.length) {
            merged.push(right[j++]);
        }

        return merged;
    }

    function mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }

        let middleIndex = Math.floor(array.length / 2);

        let left = array.slice(0, middleIndex);
        let right = array.slice(middleIndex, array.length);
        return merge(mergeSort(left), mergeSort(right));
    }

    return mergeSort(array);
};

const test1 = solution([9, 6, 7, 4, 7, 2, 2, 4, 2, 3, 7, 7]);
const out1 = [2, 2, 2, 3, 4, 4, 6, 7, 7, 7, 7, 9];
console.log(test1, out1, test1.toString() === out1.toString());