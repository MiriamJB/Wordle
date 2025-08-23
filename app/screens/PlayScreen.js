import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getRandom5LetterWord, isValid5LetterWord } from "../components/WordManager";
import {useThemeStyles} from "../components/Styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WORD_LENGTH = 5;
const MAX_TRIES = 6;

export default function PlayGame() {
    const styles = useThemeStyles();
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [solution, setSolution] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSolution(getRandom5LetterWord().toUpperCase());
    }, []);

    const keyboardRows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    const handleKeyPress = (letter) => {
        if (currentGuess.length < WORD_LENGTH) {
            setCurrentGuess((prev) => prev + letter);
        }
    };

    const handleBackspace = () => {
        setCurrentGuess((prev) => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (currentGuess.length === WORD_LENGTH && guesses.length < MAX_TRIES) {
            if (!isValid5LetterWord(currentGuess)) {
                setMessage("Not in word list.");
                return;
            }
            setGuesses([...guesses, currentGuess]);
            setCurrentGuess("");
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage("") , 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleReset = () => {
        setGuesses([]);
        setCurrentGuess("");
        setSolution(getRandom5LetterWord().toUpperCase());
    };

    const getLetterColor = (letter, index) => {
        if (solution[index] === letter) return styles.green; // green for correct letter in the correct position
        if (solution.includes(letter)) return styles.yellow; // yellow for correct letter in the wrong position
        return styles.inactiveKeyColor; // gray for incorrect letter
    };

    const previousGuessGridSquare = (colIndex, letter) => {
        const backgroundColor = getLetterColor(letter);
        return (
            <View
                key={colIndex}
                style={[ styles.guessGridSquare, { backgroundColor, borderColor: backgroundColor } ]}
            >
                <Text style={{ color: styles.buttonText.color, fontSize: 24, fontWeight: "bold" }}>
                    {letter}
                </Text>
            </View>
        );
    }

    const currentGuessGridSquare = (colIndex, letter) => {
        return (
            <View
                key={colIndex}
                style={[ styles.guessGridSquare, { borderColor: styles.gray2 } ]}
            >
                <Text style={{ color: styles.text.color, fontSize: 24, fontWeight: "bold" }}>
                    {letter}
                </Text>
            </View>
        );
    }

    const futureGuessGridSquare = (colIndex) => {
        return (
            <View
                key={colIndex}
                style={[ styles.guessGridSquare, { borderColor: styles.gray1 } ]}
            />
        );
    }

    const getKeyColor = (letter) => {
        let color = "#333";
        guesses.forEach((guess) => {
            if (guess.includes(letter)) {
                guess.split("").forEach((gLetter, i) => {
                    if (gLetter === letter) {
                        if (solution[i] === letter) {
                            color = "#22C55E"; // Green highest priority
                        } else if (solution.includes(letter) && color !== "#22C55E") {
                            color = "#EAB308"; // Yellow if not already green
                        } else if (color === "#333") {
                            color = "#374151"; // Gray
                        }
                    }
                });
            }
        });
        return color;
    };

    const keyStyle = {
        width: 36,
        height: 48,
        margin: 2,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#222',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row"}}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="lightbulb" size={styles.icon.size} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="question-circle" size={styles.icon.size} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleReset}>
                    <MaterialCommunityIcons name="restore" size={styles.icon.size} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Error message */}
            {message ? (
                <View style={{ position: "absolute", top: 70, left: 0, right: 0, zIndex: 10, alignItems: "center" }} pointerEvents="none">
                    <View style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: styles.background2, borderRadius: 6, maxWidth: 300 }}>
                        <Text style={[styles.text, { textAlign: 'center' }]}>{message}</Text>
                    </View>
                </View>
            ) : null}

            {/* Guess Grid */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {Array.from({ length: MAX_TRIES }).map((_, rowIndex) => {
                    const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
                    return (
                        <View key={rowIndex} style={{ flexDirection: "row", marginBottom: 6 }}>
                            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                                const letter = guess[colIndex] || "";
                                if (rowIndex < guesses.length) { // Previous guesses
                                    return previousGuessGridSquare(colIndex, letter);
                                } else if (rowIndex === guesses.length) { // Current guess
                                    return currentGuessGridSquare(colIndex, letter);
                                } else { // Future guesses
                                    return futureGuessGridSquare(colIndex);
                                }
                            })}
                        </View>
                    );
                })}
            </View>

            {/* Keyboard */}
            <View style={{ marginBottom: 20 }}>
                {keyboardRows.slice(0, 2).map((row, rowIndex) => (
                    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "center", marginVertical: 4 }}>
                        {row.map((letter) => (
                            <TouchableOpacity
                                key={letter}
                                onPress={() => handleKeyPress(letter)}
                                style={[keyStyle, { backgroundColor: getKeyColor(letter) }]}
                            >
                                <Text style={{ color: "white", fontSize: 16 }}>{letter}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                {/* Last row with Enter on left and Backspace on right */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 4 }}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[keyStyle, { width: 60 }]}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Enter</Text>
                    </TouchableOpacity>

                    {keyboardRows[2].map((letter) => (
                        <TouchableOpacity
                            key={letter}
                            onPress={() => handleKeyPress(letter)}
                            style={[keyStyle, { backgroundColor: getKeyColor(letter) }]}
                        >
                            <Text style={{ color: "white", fontSize: 16 }}>{letter}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        onPress={handleBackspace}
                        style={[keyStyle, { width: 60 }]}
                    >
                        <MaterialCommunityIcons name="backspace" size={24} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
