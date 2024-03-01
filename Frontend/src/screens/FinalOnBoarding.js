import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

import React, { useState, useContext } from "react";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";
import logoimage from "../../assets/turngogo/splashscreen/logo.png";
import turngogo from "../../assets/turngogo/splashscreen/turngogo.png";
import style from "../theme/style";


export default function FinalOnBoarding() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  const styles = StyleSheet.create({

    logostyle: {
      flex: 0.7,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    btngroupstyle: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    btn: {
      padding: 10,
      width: 200,
      backgroundColor: "#D9D9D9"
    }

  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={styles.logostyle}
      >
        <View style={{ flex: 3 }}>
          <Image source={logoimage} style={{ alignSelf: "flex-end" }}></Image>
        </View>
        <View style={{ flex: 4 }}>
          <Image source={turngogo} style={{ alignSelf: "center" }}></Image>
        </View>
      </View>

      <View style={{ flex: 0.2 }}>
      </View>

      <View
        style={styles.btngroupstyle}
      >
        <View style={{ paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.btn}>
            <Text style={[style.btntxt, {color:'black', alignSelf: 'center' }]}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.btn}>
            <Text style={[style.btntxt, {color:'black', alignSelf: 'center' }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}
