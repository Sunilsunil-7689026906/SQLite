import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {} from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, {} from 'react-native-reanimated';

import Home from './src/screens/Home';
import Note from './src/screens/Note';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Note' component={Note} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default App