import { Text, View } from 'react-native';
import { useThemeStyles } from '../components/Styles';

export default function PlayScreen() {
    const styles = useThemeStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Play Screen</Text>
        </View>
    );
}