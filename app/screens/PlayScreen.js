import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import { getRandom5LetterWord, isValid5LetterWord } from "../components/WordManager";

const WORD_LENGTH = 5;
const MAX_TRIES = 6;

export default function PlayGame() {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [solution, setSolution] = useState("");

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
                Alert.alert("Not in word list", "Please enter a valid word.");
                return;
            }
            setGuesses([...guesses, currentGuess]);
            setCurrentGuess("");
        }
    };

    const handleReset = () => {
        setGuesses([]);
        setCurrentGuess("");
        setSolution(getRandom5LetterWord().toUpperCase());
    };

    const getLetterColor = (letter, index) => {
        if (!solution) return "#222";
        if (solution[index] === letter) return "#22C55E"; // Green
        if (solution.includes(letter)) return "#EAB308"; // Yellow
        return "#374151"; // Gray
    };

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
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#111", padding: 16 }}>
            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Wordle</Text>
                <TouchableOpacity onPress={handleReset}>
                    <Text style={{ color: "#4ADE80", fontSize: 16 }}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* Guess Grid */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {Array.from({ length: MAX_TRIES }).map((_, rowIndex) => {
                    const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
                    return (
                        <View key={rowIndex} style={{ flexDirection: "row", marginBottom: 6 }}>
                            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                                const letter = guess[colIndex] || "";
                                const backgroundColor =
                                    guesses[rowIndex] && letter
                                        ? getLetterColor(letter, colIndex)
                                        : "#222";
                                return (
                                    <View
                                        key={colIndex}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderWidth: 2,
                                            borderColor: "#444",
                                            margin: 2,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor,
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
                                            {letter}
                                        </Text>
                                    </View>
                                );
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
                        style={[keyStyle, { backgroundColor: "#4ADE80", width: 60 }]}
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
                        style={[keyStyle, { backgroundColor: "#F87171", width: 60 }]}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>⌫</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
