import {LinearGradient} from "expo-linear-gradient";
import {useThemeStyles} from "./Styles";
import {VibrateTouchableOpacity} from "./VibrateTouchableOpacity";
import React from "react";

export const BasicButton = ({children, style, onPress}) => {
    const styles = useThemeStyles();
    return (
        <VibrateTouchableOpacity style={[style, styles.button]} onPress={onPress}>
            {/* give the children the buttonText style */}
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, { style: [child.props.style, styles.buttonText] })
                : child
            )}
        </VibrateTouchableOpacity>
    )
}

export const GradientButton = ({children, style, onPress}) => {
    const styles = useThemeStyles();
    return (
        <VibrateTouchableOpacity style={[style, {borderRadius: 5, overflow: 'hidden'}]}>
            <LinearGradient
                colors={[styles.green, '#3b7a56']}
                start={{x: 0.4, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.accentButton, {flexDirection: 'row', justifyContent: 'space-between'}]}
                onPress={onPress}
            >
                {/* give the children the buttonText style */}
                {React.Children.map(children, child =>
                    React.isValidElement(child)
                        ? React.cloneElement(child, { style: [child.props.style, styles.accentButtonText] })
                        : child
                )}
            </LinearGradient>
        </VibrateTouchableOpacity>
    )
}
