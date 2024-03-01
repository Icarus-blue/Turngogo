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
import CreateAccount from "../screens/loginscreens/CreateAccount";
import FinalOnBoarding from "../screens/FinalOnBoarding";
import SaveDiary from '../screens/SaveDiary';
import Splash from "../screens/Splash";
import Login from "../screens/loginscreens/Login";
import Signup from "../screens/loginscreens/Signup";
import Homepage from "../screens/Homepage";
import Forgot from "../screens/Forgot";
import Forgotpass from "../screens/Forgotpass";
import NewPassword from "../screens/NewPassword";
import Otp from "../screens/Otp";
import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { Colors } from "../theme/color";
import SearchGym from "../screens/SearchGym";
import { useSelector } from "react-redux";
import { storage } from "../utils/storage";
import { store } from "../redux/store";
import { SKIP_INTRO, SKIP_ONBOARDING } from "../redux/actionTypes";

// import SessionPage from '../screens/SessionPage'
// import FindGymflexers from "../screens/FindGymflexers";
// import FindIndividualCoaches from '../screens/FindIndividualCoaches'
// import Yourwallet from "../screens/Yourwallet";
// import BookTrain from "../screens/BookTrain";
// import Livechat from "../screens/Livechat";
// import QRcodescan from "../screens/QRcodescan";
// import RNcamer from '../screens/RNcamer';
// import Notification from "../screens/Notification";
// import NotificationList from "../screens/NotificationList";
// import Gymintroduction from "../screens/Gymintroduction";
// import Message from "../screens/Message";
// import Analytics from "../screens/Analytics";
// import AccountProfile from "../screens/AccountProfile";
// import FriendProfile from "../screens/FriendProfile";
// import Paymentmethod from "../screens/Paymentmethod";
// import Setting from "../screens/Setting";
// import Messagedelete from '../screens/Messagedelete';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { isLoggedin, user, profile } = useSelector((state) => state.auth);
  const { skipIntro } = useSelector((state) => state.common);
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
        store.dispatch({ type: SKIP_INTRO, payload: Boolean(skipIntro) });
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
                  name="DrawerNavigator"
                  component={DrawerNavigator}
                  options={{ headerShown: false }}
                />

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
                  name="SearchGym"
                  component={SearchGym}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="SaveDiary"
                  component={SaveDiary}
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
                name="CreateAccount"
                component={CreateAccount}
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

              <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
