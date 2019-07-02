const {run, generateWordsMap, formatMatrixIntoUI} = require('./core');

const MATRIX_LENGTH = 10;

const wordsList = {
    'husband': 'n. the man that a woman is married to; a married man',
    'steak': 'n. a large flat piece of beef without much fat on it',
    'mince': 'n. meat which has been cut into very small pieces using a machine',
    'chicken': 'n. a large bird that is often kept for its eggs or meat',
    'tell': ' v. of a person to give information to somebody by speaking or writing',
    'truth': 'n. the true facts about something, not the things that have been invented or guessed',
    'butcher': 'n. a person whose job is cutting up and selling meat in a shop/store',
    'meat': 'n. the flesh of an animal or a bird eaten as food',
    'beef': 'n. meat that comes from a cow',
    'sometimes': 'adv. occasionally rather than all of the time',
    'tomato': 'red round vegetable',
    'cabbage': 'get slime vegetable',
    'bean': 'small green vegetable',
    'pear': 'fruit',
    'grape': 'sweet fruit',
    'peach': 'orange like fruit'
}

const wordsMap = generateWordsMap(Object.keys(wordsList), MATRIX_LENGTH);

function formatMatrixIntoJSON(matrix, name) {
    const arr = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            const item = matrix[y][x];
            if (item.isUsed) {
                arr.push({
                    x,
                    y,
                    value: item.value,
                    words: item.words,
                    wordsDirection: item.wordsDirection,
                    description: item.words.map(word => wordsList[word])
                });
            }
        }
    }
    const json = {data: arr};
    const fs = require('fs');
    fs.writeFileSync(name, JSON.stringify(json, null, 2), 'utf8', err => {
        if (err) throw err;
        console.log('generate success');
    });
}

run(wordsList, wordsMap, MATRIX_LENGTH, 5, (matrix, wordsSet) => {
    formatMatrixIntoUI(matrix);
    formatMatrixIntoJSON(matrix, 'result.json');
});