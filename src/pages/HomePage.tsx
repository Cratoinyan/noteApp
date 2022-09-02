
import * as React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
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
    const [notes, setNotes] = React.useState([]);
    const [onNoteDelete, setOnNoteDelete] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const Note = (props: any) => {
        return (
            <TouchableOpacity
                style={styles.text}
                onPress={() => {
                    navigation.navigate('note', {
                        id: props.id,
                        text: props.text,
                        edit: true
                    })
                }}>
                <Text style={{ fontSize: 30 }}>
                    {props.text.length > 20 ? props.text.substr(0, 20) + '...' : props.text}
                </Text>
            </TouchableOpacity>
        );
    }


    const renderItem = ({ item }: any) => (
        <Note text={item.text} id={item.id} />
    );

    const populateNotes = async () => {
        setIsLoading(true);
        await getNotes();
        console.log(noteList);
        setNotes(noteList);
        setIsLoading(false);
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            populateNotes();
        });
    }, []);

    if (isLoading) {
        return <View><Text>--------loading--------</Text></View>
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
                    onPress={() => navigation.navigate('note', { edit: false })}
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
        borderRadius: 10,
        fontSize: 15,
        marginBottom: '5%',
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