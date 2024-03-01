import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { Buffer } from 'buffer'

export default function Setting() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useContext(themeContext);
  const { currentUser } = useSelector((state) => state.auth);

  const [avatarDataUrl, setAvatarDataUrl] = useState(null);

  const handlelogout = async () => {
    console.log('logout');
    await store.dispatch(logout());
    navigation.navigate("Login")
  }

  const setAvatarURI = async () => {
    if (currentUser.avatar) {
      const imagedata = currentUser.avatar.data.data;
      const contentType = currentUser.avatar.contentType
      const base64DataUrl = `data:${contentType};base64,${Buffer.from(imagedata).toString('base64')}`;
      setAvatarDataUrl(base64DataUrl);
    }
  }

  useEffect(() => {
    setAvatarURI()
  }, [])

  const getFirstLetters = (str) => {
    const words = str.split(' ');
    const firstLetters = words.map(word => word.charAt(0).toUpperCase());
    const result = firstLetters.join('');
    return result;
  }

  const getSpilt = (email) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  }


  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: "#F7F6f6", paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        title="Setting"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#F7F6f6", marginBottom: 30 }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: "#F7F6f6" }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20, backgroundColor: "#F7F6f6" }}>
          <View style={{ backgroundColor: "#FFFFFF", borderRadius: 50 }}>
            <View style={{ alignSelf: "center" }}>
              <View style={{ position: 'relative' }}>
                {
                  avatarDataUrl ? (
                    <>
                      <Avatar.Image size={300} source={{ uri: avatarDataUrl }}>
                      </Avatar.Image>
                    </>
                  ) : (
                    <>
                      {currentUser?.fullName ? (
                        <>
                          <Avatar.Text size={300} label={getFirstLetters(currentUser.fullName)}
                            style={{ width: 300, height: 300,}} />
                        </>
                        ) : (
                        <>
                          <Avatar.Text size={120} label={getSpilt(currentUser.email)}
                            style={{ width: 120, height: 120, position: 'absolute', top: 0, left: 25 }} />
                        </>
                      )}
                    </>
                  )
                }
                <Text style={{
                  fontSize: 18,
                  fontWeight: 700,
                  position: "absolute",
                  textAlign: 'center',
                  top:300,
                  left:70
                }}>{currentUser.fullName}</Text>
              </View>

            </View>
            <View style={{ marginTop: 100, padding: 20 }}>
              <TouchableOpacity onPress={() => { navigation.navigate("AccountProfile") }}>
                <View style={styles.borderstyle}>
                  <Icon name='person-outline' size={20}></Icon>
                  <Text style={{ fontSize: 15, marginLeft: 30, fontWeight: 600 }}>Account Detail</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("AccountProfile") }}>
                <View style={styles.borderstyle}>
                  <Icon name='settings-outline' size={20}></Icon>
                  <Text style={{ fontSize: 15, marginLeft: 30, fontWeight: 600 }}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: 'column' }}>
              <View style={{ padding: 30, }}>
                <TouchableOpacity
                  style={[
                    style.btn1,
                    {
                      backgroundColor: "#4A6C00",
                    },
                  ]}
                  onPress={() => handlelogout()}
                >
                  <Text style={[style.btntxt1, { color: 'white', textAlign: 'center' }]}>
                    Log out
                  </Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: "red", fontSize: 17, marginTop: 20, fontWeight: 700 }}>Delete Account</Text>
              </View>
            </View>
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
    width: 90,
    height: 90,

  },
  imagecontainer: {
  },
  borderstyle: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
    padding: 20
  }
});