
import * as React from 'react';
import {
    FlatList,
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

import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as RootNavigation from '../RootNavigation';
import reactScreens from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const getNotes = async (): Promise<object[]> => {
//     const value = await AsyncStorage.getItem('notes');
//     console.log(value);
//     return JSON.parse(value || '[]');
// }


// // // let notes: object[];
let noteList: any;
// notes = [
//     { text: 'test1', id: '1' },
//     { text: 'test2', id: '2' },
// ];


// let NoteViews: React.ReactElement[];

const getNotes = async () => {
    const value = await AsyncStorage.getItem('notes');
    noteList = JSON.parse(value || '[]');
    // NoteViews = notes.map((n, i) => {
    //     return <View key={i} style={styles.text}> <Text> abc</Text> </View>;
    // });
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
                keyExtractor={item => item.id}
            />
            <View style={styles.buttonStyle}>
                <Button title="New Note"
                    onPress={() => navigation.navigate('note')}
                />
            </View>
        </View>
    );
};


//---------------------------------------CLASS VERSION---------------------------------------
// class HomePage extends React.Component {
//     // navigation: any = useNavigation();
//     // state = { notes: [] }
//     // componentDidMount() {

//     //     // await getNotes();
//     //     this.setState({ notes: NoteViews });
//     //     console.debug(noteEx);
//     //     // console.debug(this.state.notes);
//     // }

//     constructor(props: object) {
//         super(props);
//         this.state = {
//             isLoading: true,
//         };

//     }

//     componentDidmount() {
//         notes = AsyncStorage.getItem('notes').then((token) => {
//             this.setState({
//                 isLoading: false
//             });
//         });
//     }


//     renderItem = ({ item }: any) => (
//         <Note text={item.text} />
//     );

//     render(): React.ReactNode {
//         console.log(notes);
//         // if (this.state.isLoading) {
//         //     return (<View> <Text>---Loading---</Text></View>);
//         // }
//         return (
//             <SafeAreaView style={{ flex: 1 }}>

//                 <FlatList
//                     data={notes}
//                     renderItem={this.renderItem}
//                     keyExtractor={item => item.id}
//                 />

//                 <View style={styles.buttonStyle}>
//                     <Button title="New Note"
//                         onPress={() => RootNavigation.navigate('note')}
//                     />
//                 </View>
//             </SafeAreaView>
//         );
//     };
// };

//--------------------------------------------CLASS VERSION END--------------------------------------

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