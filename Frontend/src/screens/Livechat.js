import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import SocketContext from "../socketContext";
import style from "../theme/style";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";
import { Buffer } from 'buffer'
import { useSelector, useDispatch } from "react-redux";
import { api } from '../api'
import moment from "moment";

export default function Chat({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const socket = useContext(SocketContext);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState(null);
  const [myAvatar, setMyAvatar] = useState(null);
  const { currentUser } = useSelector((state) => state.auth);
  const { onlineusers } = useSelector((state) => state.common);
  const [partner, setPartnerProfile] = useState({})
  const flatListRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout;

  const getPartnerProfile = async (id) => {
    try {
      const res = await api.getUser(id);
      setPartnerProfile(res.data.user)
    } catch (err) {
      if (err.response.data.status === false) {
        showToast("error", "Error", err.response.data.message)
      }
    }
  }

  const getMessage = async () => {
    try {
      data = {
        userid: currentUser._id,
        parnterid: id
      }
      const res = await api.getMessage(data)
      convertedData = res.data.messages.map(item => ({
        id: item._id,
        text: item.text,
        isUser: true,
        sender: item.sender,
        receiver: item.receiver,
        time: item.createdAt?.substring(0, 19)
      }))
      setMessages(convertedData);
      console.log(messages);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessage();
    getPartnerProfile(id)
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', (user) => {
      setIsTyping(true);
    });

    socket.on('stop typing', (user) => {
      setIsTyping(false);
    });

  }, [])

  useEffect(() => {
    setMyAvatarURI();
    setPartnerAvatarURI();
  }, [partner])

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: messages.length - 1
      });
    } else {

    }
  }, [messages]);


  const setMyAvatarURI = async () => {
    if (currentUser.avatar) {
      const imagedata = currentUser.avatar.data.data;
      const contentType = currentUser.avatar.contentType
      const base64DataUrl = `data:${contentType};base64,${Buffer.from(imagedata).toString('base64')}`;
      setMyAvatar(base64DataUrl);
    }
  }

  const setPartnerAvatarURI = async () => {
    if (partner.avatar) {
      const imagedata = partner.avatar.data.data;
      const contentType = partner.avatar.contentType
      const base64DataUrl = `data:${contentType};base64,${Buffer.from(imagedata).toString('base64')}`;
      setPartnerAvatar(base64DataUrl);
    }
  }

  const getFirstLetters = (str) => {
    const words = str.split(' ');
    const firstLetters = words.map(word => word.charAt(0).toUpperCase());
    const result = firstLetters.join('');
    return result;
  }

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing');
    }
  };

  const saveMessage = async (message) => {
    try {
      console.log(message)
      const res = await api.sendMessage(message)
    } catch (err) {

    }
  }

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomId}`;
  }

  const sendMessage = () => {

    if (inputText.trim() === '') {
      return;
    }

    const newMessage = {
      id: generateUniqueId(),
      text: inputText,
      isUser: true,
      sender: currentUser._id,
      receiver: partner._id,
      time: moment().toISOString(),
    };

    socket.emit("message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    saveMessage(newMessage);
    setInputText('');
  }

  const renderItem = ({ item }) => {
    const currentTime = moment().format("HH:mm A");
    const messageTime = moment(item.time).format("HH:mm A");
    return (
      <>
        {item.sender === currentUser._id ? (
          <>
            <View style={styles.renderMain}>
              <View style={{ marginRight: 15 }}>
                <View style={styles.textAreaStyle}>
                  <Text style={styles.txt} >
                    {item.text}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.timetxt}>
                    {messageTime}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{ paddingTop: 20, flexDirection: "row" }}>
              {partnerAvatar ? (
                <>
                  <Avatar.Image size={60} source={{ uri: partnerAvatar }}

                  >
                  </Avatar.Image>
                </>
              ) : (
                <>
                  <Avatar.Text size={60} label={getFirstLetters(currentUser.fullName)}
                  />
                </>)}
              <Image
                source={require("../../assets/image/bluedot.png")}
                style={{
                  height: 10,
                  width: 10,
                  marginTop: 65,
                  marginLeft: 45,
                  position: "absolute",
                }}
              />
              {/* {
                onlineusers.some(user => currentUser.id === item.receiver) ?
                  (
                    <Image
                      source={require("../../assets/image/bluedot.png")}
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 65,
                        marginLeft: 45,
                        position: "absolute",
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/image/yellowdot.png")}
                      style={{
                        height: 10,
                        width: 10,
                        marginTop: 65,
                        marginLeft: 45,
                        borderRadius: 10,
                        position: "absolute",
                      }}
                    />
                  )
              } */}

              <View style={{ marginLeft: 15 }}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: Colors.bord,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <Text style={[style.subtxt, { color: Colors.disable }]}>
                    {item.text}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#9CA4AB",
                    marginTop: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  {messageTime}
                </Text>
              </View>
            </View>
          </>
        )}
      </>

    );
  };

  const styles = StyleSheet.create({
    renderMain: {
      flexDirection: "row",
      paddingTop: 20,
      justifyContent: "flex-end",
    },
    textAreaStyle: {
      backgroundColor: Colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 25,
    },
    txt: {
      color: Colors.secondary,
      fontFamily: "Plus Jakarta Sans"
    },
    timetxt: {
      color: "#9CA4AB",
      marginTop: 5,
      fontFamily: "Plus Jakarta Sans",
    },
    messagebox: {
      flexDirection: "row",
      backgroundColor: theme.chat,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 20,
      justifyContent: "space-between",
      borderColor: Colors.bord,
      borderWidth: 1,
      alignItems: "center",
      marginBottom: 20,
    }
  })

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 10, }]}
    >
      <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
      <AppBar
        color={"white"}
        title="Chatting Panel"
        titleStyle={{ color: "black", fontFamily: "Plus Jakarta Sans", fontSize: 20 }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row'
          }} onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: Colors.secondary }}
              color="black"
              size={40}
            />
            {partnerAvatar !== null && (
              <>
                <Avatar.Image size={60} source={{ uri: partnerAvatar }}
                >
                </Avatar.Image>
                <Image
                  source={require("../../assets/image/bluedot.png")}
                  style={{
                    height: 10,
                    width: 10,
                    marginTop: 45,
                    marginLeft: 86,
                    position: "absolute",
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        }
      />
      <View style={[style.main, { backgroundColor: theme.bg, flex: 5 }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          getItemLayout={(data, index) => (
            { length: 50, offset: 50 * index, index }
          )}
          onScrollToIndexFailed={info => {
            console.warn(
              `Scroll to index failed for index ${info.index}. Falling back to scrollToEnd().`
            );
            flatListRef.current.scrollToEnd({ animated: true });
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", padding: 30 }}>
        {isTyping && <Text style={{ color: 'grey', margin: 15 }}>{partner.fullName} is typing...</Text>}
        <View
          style={styles.messagebox}
        >
          <TextInput
            style={[style.subtxt, { color: Colors.disable }]}
            placeholder="Type message here"
            value={inputText}
            selectionColor={Colors.primary}
            placeholderTextColor={Colors.disable}
            onChangeText={(e) => {
              setInputText(e);
              handleTyping();
              clearTimeout(typingTimeout);
              typingTimeout = setTimeout(() => {
                socket.emit("stop typing", currentUser._id);
              }, 2000);
            }}
            // onBlur={handleStopTyping}
            require
            multiline
          >
          </TextInput>

          <TouchableOpacity onPress={sendMessage}>
            <Avatar.Icon
              icon="near-me"
              color="#FE970F"
              size={40}
              style={{ backgroundColor: Colors.secondary }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

