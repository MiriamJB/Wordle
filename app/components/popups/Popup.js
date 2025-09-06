import React from "react";
import {Modal, View, StyleSheet, useColorScheme} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VibrateTouchableOpacity} from "../VibrateTouchableOpacity";
import {useThemeStyles} from "../Styles";

export default function Popup({visible, onClose, children}) {
    const colorScheme = useColorScheme();
    const styles = useThemeStyles();
    const popupStyles = useInternalPopupStyles(colorScheme, styles);

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
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const useInternalPopupStyles = (colorScheme, styles) => {
    return StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },
        popup: {
            backgroundColor: colorScheme === 'dark' ? styles.background2 : styles.background,
            borderRadius: 10,
            padding: 30,
            margin: 20,
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
    });
}

export const usePopupStyles = (styles) => {
    return StyleSheet.create({
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
        buttonContainer: {
            flexDirection: "column",
            gap: 10,
        }
    });
}
