import React from "react";
import {View, Text, Linking} from "react-native";
import {useThemeStyles} from "../Styles";
import {BasicButton, GradientButton} from "../Buttons";
import Popup, {usePopupStyles} from "./Popup";

export default function GameEndPopup({visible, onClose, solution, numberOfGuesses, win}) {
    const styles = useThemeStyles();
    const popupStyles = usePopupStyles(styles);
    const [answerRevealed, setAnswerRevealed] = React.useState(false);
    const shoutOut = ["Impossible!", "Genius!", "Excellent!", "Impressive!", "Great!", "Phew!", "Almost!"];

    const onCloseWrapper = (action) => {
        setAnswerRevealed(false);
        onClose(action);
    }

    const defineWord = () => {
        const url = `https://www.google.com/search?q=define%20${solution}#ebo=0`;
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    }

    return (
        <Popup visible={visible} onClose={() => onClose('close')}>
            <View style={{alignItems: "center"}}>
                {win === true ? <>
                    <Text style={popupStyles.title}>{shoutOut[numberOfGuesses - 1]}</Text>
                    <Text style={popupStyles.message}>
                        You guessed {solution} in {numberOfGuesses} {numberOfGuesses === 1 ? "try" : "tries"}
                    </Text>
                </> : !answerRevealed ? <>
                    <Text style={popupStyles.title}>Almost!</Text>
                    <Text style={popupStyles.message}>Get another 2 guesses to keep trying!</Text>
                </> : <>
                    <Text style={popupStyles.title}>{solution}</Text>
                    <Text style={popupStyles.message}>was the answer. Better luck next time!</Text>
                </>}
            </View>
            <View style={popupStyles.buttonContainer}>
                {!win && !answerRevealed ? <>
                    <GradientButton onPress={() => onClose('more guesses')}>
                        <Text>+2 Guesses</Text>
                        <Text>10 C</Text>
                    </GradientButton>
                    <BasicButton onPress={() => setAnswerRevealed(true)}>
                        <Text>Reveal Answer</Text>
                    </BasicButton>
                </> : <>
                    <BasicButton onPress={() => onCloseWrapper('play again')}>
                        <Text>Play Again</Text>
                    </BasicButton>
                    <BasicButton onPress={() => defineWord()}>
                        <Text>Define {solution}</Text>
                    </BasicButton>
                    <BasicButton onPress={() => onCloseWrapper('home')}>
                        <Text>Home</Text>
                    </BasicButton>
                </>}
            </View>
        </Popup>
    );
}
