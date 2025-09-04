import {Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";
import {BasicButton} from "../components/Buttons";

export default function HomeScreen() {
    const styles = useThemeStyles();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <BasicButton onPress={() => {navigation.navigate('Play')}}>
                <Text>Play Game</Text>
            </BasicButton>
        </View>
    );
}
