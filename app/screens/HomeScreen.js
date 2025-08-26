import {Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";
import {VibrateTouchableOpacity} from "../components/VibrateTouchableOpacity";

export default function HomeScreen() {
    const styles = useThemeStyles();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <VibrateTouchableOpacity
                onPress={() => {navigation.navigate('Play')}}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Play Game</Text>
            </VibrateTouchableOpacity>
        </View>
    );
}
