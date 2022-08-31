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

import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import reactScreens from 'react-native-screens';

const Stack = createNativeStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme: DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen 
            name="homePage"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="note"
            component={NotePage}
            options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomePage =({navigation}: {navigation:any}) => {
  return (
    <View style={{flex:1}}>

      <ScrollView>
        <View style={styles.text}>
          <TextInput multiline></TextInput>
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

const NotePage = ({navigation}: {navigation:any}) => {
  return (
    <View>      
      <View style={{height: '80%'}}>
        <View style={styles.textIn}>
          <TextInput multiline style={{flex: 1}} textAlign = 'left' textAlignVertical='top'></TextInput>
        </View>
      </View>

      <View style={styles.buttonStyle}>
        <Button title="Save Note"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textIn:{
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: "#393e46",
    flex: 1
  },
  text:{
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: "#393e46"
  },
  buttonStyle:{
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default App;
