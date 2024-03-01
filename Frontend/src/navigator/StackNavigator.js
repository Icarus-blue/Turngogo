import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";

// before login 
import Splash from "../screens/Splash";
import FinalOnBoarding from "../screens/FinalOnBoarding";
import Signup from "../screens/loginscreens/Signup";
import Login from "../screens/loginscreens/Login";
import Forgot from "../screens/Forgot";
import Forgotpass from "../screens/Forgotpass";
import NewPassword from "../screens/NewPassword";
import Otp from "../screens/Otp";
//
// after login
import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";

import Homepage from "../screens/Homepage";
import SaveDiary from '../screens/SaveDiary';
import Mydiary from "../screens/Mydiary";
import SavedDiary from "../screens/SavedDiary";
import FriendRequest from '../screens/FriendRequest';
import Productions from '../screens/Productions';
import ProductDetail from '../screens/ProductDetail'
import Cart from '../screens/Cart'
import CheckOut from '../screens/CheckOut';
import ShippingAddress from '../screens/ShippingAddress'
import AddingShippingAddress from '../screens/AddingShippingAddress';
import PaymentMethods from '../screens/PaymentMethods';
import OrderSuccess from '../screens/OrderSuccess'
import FriendProfile from "../screens/FriendProfile";
import Profile from "../screens/Profile";
import EditProfile from '../screens/EditProfile';
import SearchPeople from '../screens/SearchPeople'
import Notifications from "../screens/Notifications";

import { Colors } from "../theme/color";
import { useSelector } from "react-redux";
import { storage } from "../utils/storage";
import { store } from "../redux/store";


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { isLoggedin, user, profile } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });

    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  const [showSplashScreen, setshowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setshowSplashScreen(false);
    }, 3000);
    const fetchStatus = async () => {
      try {
        const skipIntro = await storage.getItem("skipIntro");      
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, []);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={darkMode === true ? Colors.active : Colors.secondary}
          barStyle={darkMode === true ? "light-content" : "dark-content"}
          translucent={false}
        />

        <Stack.Navigator>
          {showSplashScreen ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : null}
          {!isLoggedin ? (
            <>
              <>

                <Stack.Screen
                  name="BottomNavigator"
                  component={BottomNavigator}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Homepage"
                  component={Homepage}
                  options={{ headerShown: false }}
                />              

                <Stack.Screen
                  name="SaveDiary"
                  component={SaveDiary}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Mydiary"
                  component={Mydiary}
                  options={{ headerShown: false }}
                />

                
                <Stack.Screen
                  name="SavedDiary"
                  component={SavedDiary}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="FriendRequest"
                  component={FriendRequest}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Productions"
                  component={Productions}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="ProductDetail"
                  component={ProductDetail}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Cart"
                  component={Cart}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="CheckOut"
                  component={CheckOut}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="ShippingAddress"
                  component={ShippingAddress}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="AddingShippingAddress"
                  component={AddingShippingAddress}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="PaymentMethods"
                  component={PaymentMethods}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="OrderSuccess"
                  component={OrderSuccess}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="FriendProfile"
                  component={FriendProfile}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="SearchPeople"
                  component={SearchPeople}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Notifications"
                  component={Notifications}
                  options={{ headerShown: false }}
                />

              </>
            </>
          ) : (
            <>
              <Stack.Screen
                name="FinalOnBoarding"
                component={FinalOnBoarding}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
          
              <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgotpass"
                component={Forgotpass}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{ headerShown: false }}
              />
             
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
