
function buildMarkovChain(text) {
  const words = text.split(/\s+/);
  const chain = {};

  for (let i = 0; i < words.length - 1; i++) {
    const word = words[i];
    const nextWord = words[i + 1];

    if (!chain[word]) {
      chain[word] = [];
    }

    chain[word].push(nextWord);
  }

  return chain;
}

function generateFromChain(chain, length = 50) {
  const words = Object.keys(chain);
  let currentWord = words[Math.floor(Math.random() * words.length)];
  let result = [currentWord];

  for (let i = 0; i < length - 1; i++) {
    const nextWords = chain[currentWord];
    if (!nextWords || nextWords.length === 0) break;

    const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
    result.push(nextWord);
    currentWord = nextWord;
  }

  return result.join(' ');
}

function generateText() {
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('output');

  if (!input.trim()) {
    output.textContent = "Please enter training text!";
    return;
  }

  const chain = buildMarkovChain(input);
  const generated = generateFromChain(chain, 50);
  output.textContent = generated;
}
