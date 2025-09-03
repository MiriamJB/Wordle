import {LinearGradient} from "expo-linear-gradient";
import {useThemeStyles} from "./Styles";

export const Gradient = ({children}) => {
    const styles = useThemeStyles();

    return (
        <LinearGradient
            colors={[styles.green, '#3b7a56']}
            start={{x: 0.4, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.accentButton, {flexDirection: 'row', justifyContent: 'space-between'}]}
        >
            {children}
        </LinearGradient>
    )
}