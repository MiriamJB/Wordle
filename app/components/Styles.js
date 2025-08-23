import {StyleSheet, useColorScheme} from 'react-native';

export const useThemeStyles = () => {
    const colorScheme = useColorScheme();

    // define colors for light and dark themes
    const colors = {
        light: {
            background: '#fefffe',
            background2: '#aaa',
            text: '#0d0c0c',
            buttonText: '#fefffe',
            accent1: "#6baa65", // green
            accent2: "#c8b558", // yellow
            gray1: "#d3d6da", // active
            gray2: "#787c7e" // inactive
        },
        dark: {
            background: '#161616',
            background2: '#222',
            text: '#fefffe',
            buttonText: '#fefffe',
            accent1: "#528c4e", // green
            accent2: "#b59e3a", // yellow
            gray1: "#3b3a3d", // active
            gray2: "#808385", // inactive
        },
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors[colorScheme].background,
            padding: 16,
        },
        text: {
            color: colors[colorScheme].text,
        },
        button: {
            backgroundColor: colors[colorScheme].accent1,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: colors[colorScheme].buttonText,
            fontSize: 18,
        },
        icon: {
            margin: 5,
            size: 28,
            color: colors[colorScheme].text,
        },
        guessGridSquare: {
            width: 50,
            height: 50,
            borderWidth: 2,
            borderColor: colors[colorScheme].gray1,
            margin: 2,
            justifyContent: "center",
            alignItems: "center",
        },
        green: colors[colorScheme].accent1,
        yellow: colors[colorScheme].accent2,
        gray1: colors[colorScheme].gray1,
        gray2: colors[colorScheme].gray2,
        activeKeyColor: colorScheme === 'dark' ? colors.dark.gray2 : colors.light.gray1,
        inactiveKeyColor: colorScheme === 'dark' ? colors.dark.gray1 : colors.light.gray2,
        background2: colors[colorScheme].background2,
    })
}