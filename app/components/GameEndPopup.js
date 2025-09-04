import React from "react";
import {Modal, View, Text, StyleSheet} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VibrateTouchableOpacity} from "./VibrateTouchableOpacity";
import {useThemeStyles} from "./Styles";
import {BasicButton, GradientButton} from "./Buttons";

export default function GameEndPopup({visible, onClose, solution, numberOfGuesses, win}) {
    const styles = useThemeStyles();
    const popupStyles = usePopupStyles(styles);
    const [answerRevealed, setAnswerRevealed] = React.useState(false);
    const shoutOut = ["Impossible!", "Genius!", "Excellent!", "Impressive!", "Great!", "Phew!", "Almost!"];

    const onCloseWrapper = (action) => {
        setAnswerRevealed(false);
        onClose(action);
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={popupStyles.overlay}>
                <View style={popupStyles.popup}>
                    <VibrateTouchableOpacity style={popupStyles.closeButton} onPress={() => onClose('close')}>
                        <MaterialCommunityIcons name="window-close" size={styles.icon.size} style={styles.icon}/>
                    </VibrateTouchableOpacity>
                    <View style={{alignItems: "center"}}>
                        {win === true ? <>
                            <Text style={popupStyles.title}>{shoutOut[numberOfGuesses - 1]}</Text>
                            <Text style={popupStyles.message}>You guessed {solution} in {numberOfGuesses}
                                {numberOfGuesses === 1 ? "try" : "tries"}</Text>
                        </> : !answerRevealed ? <>
                            <Text style={popupStyles.title}>Almost!</Text>
                            <Text style={popupStyles.message}>Get another 2 guesses to keep trying!</Text>
                        </> : <>
                            <Text style={popupStyles.title}>{solution}</Text>
                            <Text style={popupStyles.message}>was the answer. Better luck next time!</Text>
                        </>}
                    </View>
                    <View style={{flexDirection: "column", gap: 10}}>
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
                            <BasicButton onPress={() => onCloseWrapper('home')}>
                                <Text>Home</Text>
                            </BasicButton>
                        </>}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const usePopupStyles = (styles) => {
    return StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },
        popup: {
            backgroundColor: styles.background2,
            borderRadius: 10,
            padding: 30,
            elevation: 5,
            position: "relative",
        },
        closeButton: {
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            padding: 5,
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
            color: styles.text.color,
        },
        message: {
            fontSize: 16,
            marginBottom: 20,
            color: styles.text.color,
        },
    });
}
