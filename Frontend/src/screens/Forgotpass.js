import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import style from "../theme/style";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";


export default function Forgotpass() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleMobileNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMobileNumber(numericValue);
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >    
      <AppBar
        color={theme.bg}
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: Colors.secondary }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={[style.main, { backgroundColor: theme.bg }]}>

        <View style={{ paddingTop: 20 }}>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            Forgot Password
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            Enter your  Mobil number to reset  your password
          </Text>
        </View>

        <View style={{ paddingTop: 15 }}>
          <View style={{ paddingTop: 10 }}>            
            <TextInput
              placeholder="Mobile number"
              placeholderTextColor={Colors.disable}
              style={[style.txtinput, { fontFamily: 'Plus Jakarta Sans' }]}
              value={mobileNumber}
              onChangeText={handleMobileNumberChange}
              keyboardType="numeric"
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => navigation.navigate("Otp",{mobileNumber:mobileNumber})}
            >
              <Text style={style.btntxt}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
