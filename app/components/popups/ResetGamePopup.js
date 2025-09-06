import React from "react";
import {Text, View} from "react-native";
import Popup, {usePopupStyles} from "./Popup";
import {useThemeStyles} from "../Styles";
import {BasicButton} from "../Buttons";

export default function ResetGamePopup({visible, onClose}) {
    const styles = useThemeStyles();
    const popupStyles = usePopupStyles(styles);

    return (
        <Popup visible={visible} onClose={() => onClose('close')}>
            <View style={{alignItems: "center"}}>
                <Text style={popupStyles.title}>Reset Game?</Text>
                <Text style={popupStyles.message}>This will clear your current progress, and you will get a new word.</Text>
            </View>
            <View style={popupStyles.buttonContainer}>
                <BasicButton onPress={() => onClose('reset')}>
                    <Text>Reset</Text>
                </BasicButton>
                <BasicButton onPress={() => onClose('close')}>
                    <Text>Cancel</Text>
                </BasicButton>
            </View>
        </Popup>
    );
}
