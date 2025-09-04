import {Platform, TouchableOpacity, Vibration} from "react-native";
import {useState} from "react";

export const VibrateTouchableOpacity = ({ onPress, style, children, disabled }) => {
    const [pressTime, setPressTime] = useState(null);

    const handlePressIn = () => {
        if (Platform.OS === 'ios') {
            Vibration.vibrate(); // iOS vibration duration is fixed, so we just call it
        } else {
            Vibration.vibrate(1); // Android allows custom duration
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
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );
}