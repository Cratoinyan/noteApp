/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
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

const App = () => {
  return (
    <View style={{flex:1}}>

      <ScrollView>
        <View style={styles.textIn}>
          <TextInput multiline></TextInput>
        </View>
      </ScrollView>
      <View style={styles.buttonStyle}>
        <Button title="New Note"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textIn:{
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
