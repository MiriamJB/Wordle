import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";

export default function HomeScreen() {
    const styles = useThemeStyles();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {navigation.navigate('Play')}}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Play Game</Text>
            </TouchableOpacity>
        </View>
    );
}
