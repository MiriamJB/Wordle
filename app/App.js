import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {useColorScheme} from "react-native";
import {PlayContextProvider} from "./components/PlayContext";
import HomeScreen from "./screens/HomeScreen";
import PlayScreen from "./screens/PlayScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();

    return (
        <PlayContextProvider>
            <StatusBar style="auto"/>
            <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName='Home' id='root'>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='Play' component={PlayScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PlayContextProvider>
    );
}