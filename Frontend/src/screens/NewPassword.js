import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";

export default function NewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >

      <AppBar
        color={theme.bg}
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}>
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
            style={[style.title, { textAlign: "center", color: theme.txt,marginBottom:30 }]}
          >
            Change Password
          </Text>

          <Text style={{ color: '#333333', textAlign: 'center' }}>
            Your new passowrd must be different from
          </Text>
          <Text style={{ color: '#333333', textAlign: 'center' }}>
            previous used passwords
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              },
            ]}
          >
            <TextInput
              placeholder="Create a password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icons
                name={isPasswordVisible ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!isPassword}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            />
            <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
              <Icons
                name={isPassword ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={style.btn}
            >
              <Text style={style.btntxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
