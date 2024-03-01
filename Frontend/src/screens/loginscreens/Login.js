import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import { login, loginGoogle } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../redux/store";
import SocketContext from "../../socketContext";
import { api } from "../../api";
import { showToast } from "../../components/ShowToast";

export default function Loginemail() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const theme = useContext(themeContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoading, error, message } = useSelector((state) => state.common);

  const handleLogin = async () => {
    try {
      if (isLoading) return;
      const res = await store.dispatch(login({ email, password }));
      if (res.data.sucess) {
        showToast("success", 'login', 'login successfully')
        socket.connect();
        socket.emit('joining', {
          user: {
            id: res.data.user._id,
            name: res.data.user.fullName
          }
        })
      }
    } catch (err) {
    }
  };

  const styles = StyleSheet.create({
    headtxt: {
      textAlign: 'center',
      fontFamily: 'Avenir LT Pro',
      fontStyle: "italic",
      marginBottom: 70,
      color:'#7D848D'
    },
    body: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 40
    }
  })

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      <AppBar
        color={theme.bg}
        title="Login Now"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("FinalOnBoarding")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: Colors.secondary }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Text style={styles.headtxt}>
            Please sign in to continue our app
          </Text>
          <View style={{paddingVertical:10}}>
            <TextInput
              placeholder="www.example.com"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              onChangeText={(e) => setEmail(e)}
              require
              style={[
                style.txtinput,
                { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans", fontStyle: 'italic' },
              ]}
            />
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
              placeholder="Enter Your Password"
              selectionColor={Colors.primary}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              onChangeText={(e) => setPassword(e)}
              style={{
                backgroundColor: theme.bg,
                color: Colors.disable,
                fontFamily: "Plus Jakarta Sans",
                fontStyle: 'italic'
              }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                color={Colors.active}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {error && (
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "red" }}>{message}</Text>
            </View>
          )}
          <View style={{ alignItems: "flex-end", paddingTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontStyle: 'italic'
                }}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity onPress={handleLogin} style={style.btn}>
              <Text style={[style.btntxt, { fontStyle: 'italic' }]}>Login</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Text style={style.txt1}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={[
                  style.txt,
                  { color: 'black', fontWeight: "700", marginBottom: 20, fontStyle: 'italic' },
                ]}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: 370 },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 428,
    height: 275,
  },
});