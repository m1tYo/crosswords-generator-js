const args = require('minimist')(process.argv.slice(2));

const matrixLength = args.mlength || 10;
const wordsFile = args.wfile || './words.json';
const retries = args.retries || 5;

const { run, generateWordsMap, formatMatrixIntoUI } = require('./core');

const words = require(wordsFile);
const wordsList = words.data;

const wordsMap = generateWordsMap(wordsList, matrixLength);

run(wordsList, wordsMap, matrixLength, retries, (matrix, wordsSet) => {
  formatMatrixIntoUI(matrix);
  console.log("END MATRIX\n");
  wordsSet.forEach(usedWord => {
    console.log(usedWord);
  })
});