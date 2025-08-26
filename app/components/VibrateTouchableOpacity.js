import {Platform, TouchableOpacity, Vibration} from "react-native";
import {useState} from "react";

export const VibrateTouchableOpacity = ({ onPress, style, children }) => {
    const [pressTime, setPressTime] = useState(null);

    const handlePressIn = () => {
        // Vibrate for 50 milliseconds
        if (Platform.OS === 'ios') {
            // iOS vibration duration is fixed, so we just call it
            Vibration.vibrate();
        } else {
            // Android allows custom duration
            Vibration.vibrate(1);
            setPressTime(Date.now());
        }
    };

    const handlePressOut = () => {
        if (!pressTime || Platform.OS === 'ios') return;
        const elapsedPressTime = Date.now() - pressTime;
        if (elapsedPressTime > 250) {
            Vibration.vibrate(1);
        }
    }

    return (
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={style}>
            {children}
        </TouchableOpacity>
    );
}