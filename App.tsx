/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';

const Stack = createNativeStackNavigator();

const getNotes = async () => {
  const value = await AsyncStorage.getItem('notes');
  return JSON.parse(value || '[]');
}

const notes = getNotes();

const setNotes = async () => {
  await AsyncStorage.setItem('notes', JSON.stringify(notes));
}

const saveNote = async (text: string) => {

}

const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="homePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="note"
          component={NotePage}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
