
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

let notes: any;

const getNotes = async () => {
    const value = await AsyncStorage.getItem('notes');
    notes = JSON.parse(value || '[]');
    console.log(notes);
}


const NotePage = ({ route, navigation }: { navigation: any, route: any }) => {
    const [noteText, setText] = useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    let noteInfo = route.params;

    console.log(noteInfo);

    const editNote = (text: string) => {
        const noteIndex = notes.findIndex((note: any) => note.id == noteInfo.id);
        notes[noteIndex].text = text;

    };

    const newNote = (textIn: string) => {
        const tempId = uuid.v4();

        const note = {
            text: textIn,
            id: tempId
        };
        notes.push(note);

        noteInfo = {
            text: noteText,
            edit: true,
            id: tempId
        }
    };

    const deleteNote = async (id: string) => {
        const noteIndex = notes.findIndex((note: any) => note.id == id);
        notes.splice(noteIndex, 1);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.goBack();
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Delete' onPress={() => { deleteNote(noteInfo.id) }}
                />
            )
        })
    });


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
                        onChangeText={newText => setText(newText)}
                        defaultValue={noteInfo.text || ''} />
                </View>
            </View>

            <View style={styles.buttonStyle}>
                <Button title="Save Note"
                    onPress={() => {
                        noteInfo.edit ? editNote(noteText) : newNote(noteText);
                        console.log(newNote);
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