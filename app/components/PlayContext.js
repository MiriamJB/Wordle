import {createContext, useContext, useState} from "react";

const PlayContext = createContext(null);

export const PlayContextProvider = ({children}) => {
    const [solution, setSolution] = useState('');
    const [wordLength, setWordLength] = useState(5);
    const [maxGuesses, setMaxGuesses] = useState(6);
    const [hardMode, setHardMode] = useState(false);

    return (
        <PlayContext.Provider value={{
            solution, setSolution,
            wordLength, setWordLength,
            maxGuesses, setMaxGuesses,
            hardMode, setHardMode
        }}>
            {children}
        </PlayContext.Provider>
    );
}

export const usePlayContext = () => {
    const context = useContext(PlayContext);
    if (!context) {
        throw new Error('usePlayContext must be used within a PlayContextProvider');
    }
    return context;
}