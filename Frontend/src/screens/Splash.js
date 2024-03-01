import {
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from "react-native";
import React from "react";
import { Colors } from "../theme/color";
import logoimage from "../../assets/turngogo/splashscreen/logo.png";
import turngogo from "../../assets/turngogo/splashscreen/turngogo.png";

export default function Splash() {

  const styles = StyleSheet.create({
    logostyle: {
      flex: 2.5,
      flexDirection: "row",
      alignItems: "center",    
    },
    spinerstyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
  });

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={styles.logostyle}
      >
        <View style={{flex:3}}>
          <Image source={logoimage} style={{alignSelf:"flex-end"}}></Image>
        </View>
        <View style={{flex:4}}>
          <Image source={turngogo} style={{alignSelf:"center"}}></Image>
        </View>

      </View>

      <View
        style={styles.spinerstyle}
      >
        <ActivityIndicator size={50} color={Colors.spincolor} />
      </View>
    </SafeAreaView>
  );
}
