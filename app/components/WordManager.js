import {fiveLetterDictionary} from './word_lists/fiveLetterDictionary';

/** Returns a random word from the fiveLetterWords array. */
export function getRandom5LetterWord() {
	const randomIndex = Math.floor(Math.random() * fiveLetterDictionary.length);
	const word = fiveLetterDictionary[randomIndex];
	console.log(word);
	return word;
}

/** Checks if a guess is a valid 5-letter word. */
export function isValid5LetterWord(guess) {
	return fiveLetterDictionary.includes(guess.toLowerCase());
}
