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
  useColorScheme,
  Button
} from 'react-native';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../RootNavigation'
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';

const Stack = createNativeStackNavigator();




const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer ref={navigationRef} theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName='homePage'>
        <Stack.Screen
          name="homePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="note"
          component={NotePage}
          options={{
            headerTitle: '',
            headerRight: () => (
              <Button title='Delete' onPress={() => {
              }} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
