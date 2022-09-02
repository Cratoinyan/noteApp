
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    Button
} from 'react-native';
import uuid from 'react-native-uuid';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reactScreens from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

let notes: object[] = [];

const getNotes = async () => {
    const value = await AsyncStorage.getItem('notes');
    notes = JSON.parse(value || '[]');
    // NoteViews = notes.map((n, i) => {
    //     return <View key={i} style={styles.text}> <Text> abc</Text> </View>;
    // });
    console.log(notes);
}


const NotePage = ({ navigation }: { navigation: any }) => {
    const [noteText, setText] = useState('');
    const [isLoading, setIsLoading] = React.useState(true)



    const populateNotes = async () => {
        await getNotes();
        setIsLoading(false);
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            populateNotes();
        });
    });

    if (isLoading) {
        return <View><Text>-----LOADING-----</Text></View>
    }

    return (
        <View>
            <View style={{ height: '80%' }}>
                <View style={styles.textIn}>
                    <TextInput
                        multiline
                        style={{ flex: 1 }}
                        textAlign='left'
                        textAlignVertical='top'
                        numberOfLines={15}
                        onChangeText={newText => setText(newText)} />
                </View>
            </View>

            <View style={styles.buttonStyle}>
                <Button title="Save Note"
                    onPress={() => {
                        const newNote = {
                            text: noteText,
                            id: uuid.v4()
                        };
                        console.log(newNote);
                        notes.push(newNote);
                        AsyncStorage.setItem('notes', JSON.stringify(notes));
                    }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textIn: {
        borderWidth: 2,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: "#393e46",
        flex: 1
    },
    text: {
        borderWidth: 2,
        borderRadius: 20,
        fontSize: 30,
        overflow: 'hidden',
        borderColor: "#393e46"
    },
    buttonStyle: {
        position: 'absolute',
        right: 0,
        bottom: 0
    }
});

export default NotePage;