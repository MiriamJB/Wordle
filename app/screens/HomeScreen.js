import {Text, View, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";
import {BasicButton} from "../components/Buttons";
import {getRandom5LetterWord} from "../components/WordManager";
import {usePlayContext} from "../components/PlayContext";

export default function HomeScreen() {
    const styles = useThemeStyles();
    const navigation = useNavigation();
    const {setSolution, setWordLength} = usePlayContext();

    const playStates = [
        {
            "section": "NYT Wordle",
            "modes": [
                {
                    "name": "Today's Wordle",
                    "description": "Play the classic daily Wordle game"
                },
                {
                    "name": "Wordle Archive",
                    "description": "Access past Wordle puzzles"
                }
            ]
        },
        {
            "section": "Classic Modes",
            "modes": [
                {
                    "name": "Easy",
                    "description": "Words like plate, crane, and stone"
                },
                {
                    "name": "Medium",
                    "description": "Words like crypt, plaza, and knoll"
                },
                {
                    "name": "Hard",
                    "description": "Words like sated, glyph, and fjord"
                }
            ]
        },
        {
            "section": "Word Lengths",
            "modes": [
                {
                    "name": "4-Letter Words",
                    "description": "Words like game, play, and code"
                },
                {
                    "name": "6-Letter Words",
                    "description": "Words like planet, coding, and random"
                }
            ]
        },
        {
            "section": "Languages",
            "modes": [
                {
                    "name": "Spanish",
                    "description": "Juega al Wordle en español"
                },
                {
                    "name": "Russian",
                    "description": "Играйте в Wordle на русском"
                }
            ]
        }
    ]


    const handleButtonPress = (state) => {
        if (state === "Easy" || state === "Medium" || state === "Hard") {
            setSolution(getRandom5LetterWord().toUpperCase());
        } else if (state === "4-Letter Words") {
            setWordLength(4);
        } else if (state === "6-Letter Words") {
            setWordLength(6);
        }
        navigation.navigate('Play');
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'stretch', gap: 10, paddingVertical: 20}}> 
            {playStates.map((section) => (
                <View key={section.section} style={{borderWidth: 0.5, borderColor: styles.gray2, borderRadius: 10, padding: 10}}>
                    <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold', marginBottom: 10}]}>
                        {section.section}
                    </Text>
                    <View style={{flexDirection: 'column', justifyContent: 'center', gap: 10}}>
                        {section.modes.map((mode) => (
                            <BasicButton
                                key={mode.name}
                                onPress={() => handleButtonPress(mode.name)}
                            >
                                <Text>{mode.name}</Text>
                                <Text style={{fontSize: 12, color: styles.text.color, opacity: 0.7}}>
                                    {mode.description}
                                </Text>
                            </BasicButton>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
