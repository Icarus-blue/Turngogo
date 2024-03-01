import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../theme/color";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { api } from "../../api";

export default function Signup() {

  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateAccount = async () => {
    if (data.fullName === "" || data.email === "") {
      setError(true);
      setErrorMessage("fullname and email is required.");
    } else if (data.password.length < 6) {
      setError(true);
      setErrorMessage("Password should be 6 length at least.");
    } else if (data.password !== data.confirmPassword) {
      setError(true);
      setErrorMessage("Confirm password is incorrect.");
    } else {
      setError(false);
      setErrorMessage("");
    }
    try {
      data.role = value
      const res = await api.signup(data);
      navigation.navigate("Login")
    } catch (err) {
      console.log(err);
    }
  };

  const styles = StyleSheet.create({
    headtxt: {
      textAlign: 'center',
      fontFamily: 'Avenir LT Pro',
      fontStyle: "italic",
      margin: 50,
      color:'#7D848D'
    }
  });

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          backgroundColor: theme.bg,
          paddingTop: 40,
          fontFamily: "Plus Jakarta Sans",
        },
      ]}
    >

      <AppBar
        color={theme.bg}
        title="Sign Up now"
        titleStyle={{ color: theme.txt }}
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

      <View
        style={[
          style.main,
          {
            backgroundColor: theme.bg,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headtxt}>Please fill the details and create account</Text>
          <View style={{ flex: 1 }}>

            <View >
              <TextInput
                placeholder="Enter Your Full Name"
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg,fontStyle:"italic" }]}
                onChangeText={(e) => setData({ ...data, fullName: e })}
              />
            </View>

            <View style={{ marginVertical: 8 }}>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  placeholder="example@gmail.com"
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  onChangeText={(e) => setData({ ...data, email: e })}
                />
              </View>
            </View>

            <View style={{ marginVertical: 8 }}>
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
                  placeholder="Enter Your Password"
                  selectionColor={Colors.primary}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={Colors.disable}
                  onChangeText={(e) => setData({ ...data, password: e })}
                  style={{
                    backgroundColor: theme.bg,
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    fontStyle:'italic'
                  }}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Icon
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    color={theme.txt}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingTop: 8 }}>
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
                  onChangeText={(e) =>
                    setData({ ...data, confirmPassword: e })
                  }
                  style={{
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    fontStyle : "italic"
                  }}
                />
                <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                  <Icon
                    name={isPassword ? "eye-off" : "eye"}
                    color={theme.txt}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error && (
              <View>
                <Text style={{ color: Colors.warn, paddingTop: 10, paddingLeft: 10 }}>
                  {errorMessage}
                </Text>
              </View>
            )}
            <View style={{ paddingVertical: 30 }}>
              <TouchableOpacity onPress={handleCreateAccount} style={style.btn}>
                <Text style={style.btntxt}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
                bottom: 25,
              }}
            >
              <Text style={style.txt1}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={[style.txt, { color: 'black', fontWeight: "500" }]}
                >
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            >

            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
