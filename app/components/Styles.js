import {StyleSheet, useColorScheme} from 'react-native';

export const useThemeStyles = () => {
    const colorScheme = useColorScheme();

    // define colors for light and dark themes
    const colors = {
        light: {
            background: '#fff',
            text: '#000',
            buttonBackground: '#13b85c',
            buttonText: 'white',
        },
        dark: {
            background: '#232323',
            text: '#fff',
            buttonBackground: '#13b85c',
            buttonText: 'white',
        },
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors[colorScheme].background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: colors[colorScheme].text,
        },
        button: {
            backgroundColor: colors[colorScheme].buttonBackground,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: colors[colorScheme].buttonText,
            fontSize: 18,
        },
    })
}