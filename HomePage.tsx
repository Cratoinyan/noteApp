
import * as React from 'react';
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

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reactScreens from 'react-native-screens';

const HomePage = ({ navigation }: { navigation: any }) => {
    return (
        <View style={{ flex: 1 }}>

            <ScrollView>
                <View style={styles.text}>
                    <Text>lorem ipsum</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonStyle}>
                <Button title="New Note"
                    onPress={() => navigation.navigate('note')}
                />
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

export default HomePage;