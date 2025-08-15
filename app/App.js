import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import PlayScreen from "./screens/PlayScreen";
import {StatusBar} from "expo-status-bar";
import {useColorScheme} from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();

    return (
        <>
            <StatusBar style="auto"/>
            <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName='Home' id='root'>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='Play' component={PlayScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}