import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const WORD_LENGTH = 5;
const MAX_TRIES = 6;

export default function PlayGame() {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");

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
            setGuesses([...guesses, currentGuess]);
            setCurrentGuess("");
        }
    };

    const handleReset = () => {
        setGuesses([]);
        setCurrentGuess("");
    };

    const keyStyle = {
        width: 36,
        height: 48,
        backgroundColor: "#333",
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
                            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => (
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
                                        backgroundColor: "#222",
                                    }}
                                >
                                    <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
                                        {guess[colIndex] || ""}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </View>

            {/* Keyboard */}
            <View style={{ marginBottom: 20 }}>
                {keyboardRows.slice(0, 2).map((row, rowIndex) => (
                    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "center", marginVertical: 4 }}>
                        {row.map((letter) => (
                            <TouchableOpacity key={letter} onPress={() => handleKeyPress(letter)} style={keyStyle}>
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
                        <TouchableOpacity key={letter} onPress={() => handleKeyPress(letter)} style={keyStyle}>
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
