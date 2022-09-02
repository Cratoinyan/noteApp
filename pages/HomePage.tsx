
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

const Note = ({ text }: any) => {
    return (
        <View style={styles.text}>
            <Text style={{ fontSize: 50 }}>
                {text}
            </Text>
            <Button title='delete' onPress={() => {
                console.log(noteList)
            }} />
        </View>
    );
}

//--------------------------------------Functional Component-------------------------------------
const HomePage = ({ navigation }: { navigation: any }) => {
    // populateNotes();
    const [isLoading, setIsLoading] = React.useState(true)
    const [notes, setNotes] = React.useState([]);

    const renderItem = ({ item }: any) => (
        <Note text={item.text} />
    );

    const populateNotes = async () => {
        await getNotes();
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


//--------------------------------DOC EXAMPLE--------------------------------------------------
// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         text: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         text: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         text: 'Third Item',
//     },
// ];

// console.log(DATA);

// const Item = ({ text }: any) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{text}</Text>
//     </View>
// );

// const HomePage = () => {
//     const renderItem = ({ item }: any) => (
//         <Item text={item.text} />
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={DATA}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//         backgroundColor: '#f9c2ff',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//     },
//     title: {
//         fontSize: 32,
//     },
// });

// export default HomePage;