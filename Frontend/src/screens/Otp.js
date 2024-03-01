import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import OtpInputs from "react-native-otp-inputs";
import Clipboard from "@react-native-clipboard/clipboard";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { api } from "../api";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { storage } from "../utils/storage";
import { store } from "../redux/store";
import { login, verifyOtp } from "../redux/actions/auth";
import { LOGIN_REQUEST, LOGIN_SUCCESS, SKIP_ONBOARDING } from "../redux/actionTypes";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default function Otp({ route, navigation }) {
  const { isLoading, error, message } = useSelector(
    (state) => state.common
  );
  const { isLoggedin } = useSelector((state) => state.auth);
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (isLoggedin) setVisible(true);
  }, [isLoggedin]);

  const handleVerifyOtp = async () => {
    if (isLoading) return;
    if (otp.length !== 4) {
      Toast.show({
        type: "error",
        text1: "OTP is incorrect",
        text2: "Please provide correct 4 digits.",
      });
      return;
    }
    store.dispatch(verifyOtp(otp, setVisible));
  };

  const resendOtp = async () => {
    try {
      const res = await api.resendOtpEmail(route.params.email);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Incorrect OTP",
        text2: "Please provice correct 4 digits",
        position: "bottom",
      });
      console.log(e);
    }
  };

  const handleContinue = async () => {
    try {
      setVisible(false);
      navigation.navigate("OnBoarding");
    } catch (err) {
      console.log(err)
    }
  };

  const handleChangeOTP = (e) => {
    setOtp(e)
  }
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      <AppBar
        color={theme.bg}
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

      <View style={{ flex: 1, paddingTop: 50, marginHorizontal: 20 }}>
        <Text style={[style.title, { color: theme.txt, textAlign: "center" }]}>
          OTP Verification
        </Text>
        <View style={{ paddingTop: 15 }}></View>
        <Text style={[style.txt1, { textAlign: "center" }]}>
          Sent to your mobile number 
          <Text style={[style.txt1, { color: theme.txt }]}>
            {" "}
            {route.params.mobileNumber}
          </Text>
        </Text>
        <View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={[style.txt1,{marginLeft:50}]}>
            OTP Code
          </Text>
          <OtpInputs
            Clipboard={Clipboard}
            numberOfInputs={4}
            selectionColor={Colors.primary}
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            handleChange={handleChangeOTP}
            inputStyles={{
              borderColor: Colors.primary,
              backgroundColor: theme.bg,
              borderRadius: 5,
              textAlign: "center",
              height: 50,
              width: 50,
              fontSize: 20,
              borderWidth: 1,
              color: theme.txt,
              fontWeight: "bold",
            }}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity style={style.btn} onPress={()=>{navigation.navigate('NewPassword')}}>
            <Text style={style.btntxt}>Verify</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            justifyContent: "center",
          }}
        >
          <Text style={[style.txt1]}>Didn't receive code?</Text>
          <TouchableOpacity onPress={resendOtp}>
            <Text style={[style.txt1, { color: Colors.primary }]}>
              {" "}
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent={true} visible={visible}>
        <View
          style={{
            width: width,
            flex: 1,
            backgroundColor: "#000000aa",
            transparent: "true",
          }}
        >
          <View style={[style.modalcontainer, { backgroundColor: theme.bg }]}>
            <Image
              source={require("../../assets/image/success.png")}
              style={{ alignSelf: "center" }}
            />
            <View style={{ paddingTop: 15 }}>
              <Text
                style={[style.title, { color: theme.txt, textAlign: "center" }]}
              >
                You have logged in
              </Text>
              <Text
                style={[style.title, { color: theme.txt, textAlign: "center" }]}
              >
                successfully
              </Text>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={[style.txt1, { textAlign: "center" }]}>
                Lorem Ipsum is simply dummy text of the
              </Text>
              <Text style={[style.txt1, { textAlign: "center" }]}>
                printing and typesetting industry.
              </Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <TouchableOpacity style={style.btn} onPress={handleContinue}>
                <Text style={style.btntxt}>Continue</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}></View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
