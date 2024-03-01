import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function DrawerNavigator({ navigation }) {
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('SearchGym')}>
        <Text>Search Gym</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('SaveDiary')}>
        <Text>Save Diary</Text>
      </TouchableOpacity>
    </View>
  );
}