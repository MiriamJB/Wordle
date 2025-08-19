const fs = require('fs');
const path = require('path');

/**
 * Returns a random word from the 5_letter_dictionary file.
 */
export function getRandom5LetterWord() {
	const filePath = path.join(__dirname, 'word_lists', '5_letter_dictionary');
	const data = fs.readFileSync(filePath, 'utf8');
	const words = data.split(/\r?\n/).filter(Boolean);
	const randomIndex = Math.floor(Math.random() * words.length);
	return words[randomIndex];
}
