
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

const NotePage = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            <View style={{ height: '80%' }}>
                <View style={styles.textIn}>
                    <TextInput multiline style={{ flex: 1 }} textAlign='left' textAlignVertical='top'></TextInput>
                </View>
            </View>

            <View style={styles.buttonStyle}>
                <Button title="Save Note" />
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