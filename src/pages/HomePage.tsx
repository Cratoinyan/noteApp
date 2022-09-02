
import * as React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

let noteList: any;

const getNotes = async () => {
    const value = await AsyncStorage.getItem('notes');
    noteList = JSON.parse(value || '[]');
    console.log(noteList);
}


//--------------------------------------Functional Component-------------------------------------
const HomePage = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [notes, setNotes] = React.useState([]);
    const [onNoteDelete, setOnNoteDelete] = React.useState(0);

    const Note = (props: any) => {
        console.log(props.id);
        return (
            <View style={styles.text}>
                <Text style={{ fontSize: 50 }}>
                    {props.text}
                </Text>
                <Button title='delete' onPress={() => {
                    deleteNote(props.id);
                    setOnNoteDelete(key => key + 1);
                }} />
            </View>
        );
    }


    const renderItem = ({ item }: any) => (
        <Note text={item.text} id={item.id} />
    );

    const deleteNote = async (id: string) => {
        const noteIndex = noteList.findIndex((note: any) => note.id == id);
        noteList.splice(noteIndex, 1);
        await AsyncStorage.setItem('notes', JSON.stringify(noteList));
        setNotes(noteList);
    }

    const populateNotes = async () => {
        await getNotes();
        console.log(noteList);
        setNotes(noteList);
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
        <View style={{ flex: 1 }}>

            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
            <View style={styles.buttonStyle}>
                <Button title="New Note"
                    onPress={() => navigation.navigate('note')}
                />
            </View>
        </View>
    );
};

//-----------------------------------------------STYLE SHEET-----------------------------------------
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
        bottom: 20
    }
});

export default HomePage;