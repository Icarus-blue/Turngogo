import { View, Text } from "react-native";
import React from "react";
import StackNavigator from "./src/navigator/StackNavigator";
import DrawerNavigator from './src/navigator/DrawerNavigator';
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from 'react-native-toast-message';
import SocketContext from './src/socketContext';
import { socket, SocketWrapper } from './src/utils/socket';


export default function App() {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <StackNavigator />
      </SocketContext.Provider>
      <Toast />
      <SocketWrapper />
    </Provider>
  );
}

