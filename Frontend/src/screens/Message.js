import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  StyleSheet
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../theme/style";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api";
import { useSelector } from "react-redux";
import { Buffer } from 'buffer'

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Message() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser } = useSelector(state => state.auth)
  const [chats, setChats] = useState([]);
  const [sortedMessage, setSortedMessage] = useState([]);
  const [flexers, setFlexers] = useState([]);

  const getAllChat = async () => {
    try {
      const res = await api.getAllChat();
      setChats(res.data.message)
    } catch (err) {

    }
  }

  const createPartnerArrays = (array, userId) => {
    const partnerArrays = {};
    array.forEach((obj) => {
      const partnerId = obj.sender !== userId ? obj.sender : obj.receiver;
      if (!partnerArrays[partnerId]) {
        partnerArrays[partnerId] = [];
      }
      partnerArrays[partnerId].push(obj);
    });
    return partnerArrays;
  };

  const getFlexers = async () => {
    try {
      const res = await api.getUsers();
      if (res.data.success) {
        setFlexers(res.data.users);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllChat();
    getFlexers()
  }, [])

  useEffect(() => {
    setSortedMessage(createPartnerArrays(chats, currentUser._id));
  }, [chats])

  const RenderEach = () => {
    return (
      <>
        {Object.keys(sortedMessage).map((key) => (
          <>
            {flexers.map((item, index) => {
              let base64DataUrl
              if (item?.avatar) {
                const imagedata = item?.avatar?.data?.data;
                const contentType = item?.avatar?.contentType;
                base64DataUrl = `data:${contentType};base64,${Buffer.from(imagedata).toString('base64')}`;
              }

              const getFirstLetters = (str) => {
                const words = str.split(' ');
                const firstLetters = words.map(word => word.charAt(0).toUpperCase());
                const result = firstLetters.join('');
                return result;
              }
              return (
                <>
                  {item._id === key && (
                    <View style={{
                      flexDirection: "row", paddingTop: 20, padding: 10,
                      position: 'relative'
                    }}>
                      {base64DataUrl ? (
                        <Image
                          source={{ uri: base64DataUrl }}
                          style={[styles.image]}
                          resizeMode="cover"
                        />
                      ) : (
                        <Avatar.Text size={70} label={getFirstLetters(item.fullName)}
                          style={{ width: 70, height: 70 }} />
                      )}
                      <Image
                        source={require("../../assets/image/greenoutline.png")}
                        style={{
                          height: 15,
                          width: 15,
                          position: "absolute",
                          marginTop: 70,
                          marginLeft: 65,
                        }}
                      />
                      <View style={{ paddingLeft: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Livechat", { id: item._id })}>
                          <Text style={[style.subtitle, { color: theme.txt }]}>
                            {item.fullName}
                          </Text>
                          <Text
                            style={[style.subtxt, { color: Colors.disable, paddingTop: 8 }]}
                          >
                            {sortedMessage[key][sortedMessage[key].length - 1].text.substring(0, 30)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        marginLeft: 20, position: 'absolute',
                        right: 20, top: 25
                      }}>
                        <Text style={[style.subtxt, { color: Colors.disable }]}>{item.createdAt.substring(11, 16)}</Text>
                        <View
                          style={{
                            backgroundColor: "#FE970F",
                            height: 20,
                            width: 20,
                            borderRadius: 20,
                            alignSelf: "flex-end",
                            marginTop: 8,
                          }}
                        >
                          <TouchableOpacity onPress={() => navigation.navigate("Livechat", { id: item._id })}>
                            <Text
                              style={{
                                textAlign: "center",
                                color: Colors.secondary,
                                fontSize: 12,
                              }}
                            >
                              2
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                </>
              )
            }
            )}

          </>
        ))}
      </>
    )
  }

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      <StatusBar
        backgroundColor={darkMode === true ? "#000" : "#fff"}
        barStyle={darkMode === true ? "light-content" : "dark-content"}
        translucent={false}
      />
      <AppBar
        color={theme.bg}
        title="Message"
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
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
        <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 20 }}>
          <View style={[style.inputContainer, { backgroundColor: theme.bg }]}>
            <Icon name="search" size={20} color={Colors.disable} />
            <TextInput
              placeholder="search"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={{ flex: 1, color: Colors.active }}
            />
            <View
              style={[
                style.verticaldivider,
                { backgroundColor: Colors.disable, marginHorizontal: 10 },
              ]}
            ></View>
            <TouchableOpacity>
              <Image
                source={require("../../assets/image/Filter.png")}
                style={{ width: width / 20, height: height / 40 }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <RenderEach />
      </ScrollView>
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 50,
          right: 20,
        }}
      >
        <TouchableOpacity>
          <Avatar.Icon
            icon="plus"
            color={theme.bg}
            style={{ backgroundColor: theme.txt }}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: 700 },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 70,

  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -100, // Adjust the value to position the text as desired
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  hiddenMe: {
    display: "none"
  }
});
