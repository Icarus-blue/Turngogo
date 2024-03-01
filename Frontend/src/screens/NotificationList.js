import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Switch,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Card } from 'react-native-paper';
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar, Flex } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api";
import { getfriendrequests, getUser, setNumMessages } from "../redux/actions/common";

import Toast from "react-native-toast-message";


export default function NotificationList() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [ison, setIsOn] = useState(false);
  const toggle = () => setIsOn((previousState) => !previousState);

  const toggle1 = () => setIsOn1((previousState) => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(true);

  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);

  const [darkMode, setDarkMode] = useState(false);



  const { currentUser, } = useSelector((state) => state.auth);
  const { friendRequests, numMessages, unReadMessages } = useSelector((state) => state.common);

  const dispatch = useDispatch()


  useEffect(() => {
    console.log('Friend Request', numMessages)
    console.log('Friend Requests', friendRequests)
  }, [])


  const accecptRequest = async (id) => {
    console.log('accept', id)
    try {
      const res = await api.acceptfriendrequest(id)

      Toast.show({
        type: "success",
        text1: "Message",
        text2: res.data.message,
      });

    } catch (err) {
      console.log(err)
      Toast.show({
        type: "error",
        text1: "Message",
        text2: err,
      });
    }
    // declare the data fetching function
    const fetchData = async () => {
      dispatch(getfriendrequests())
      dispatch(getUser(currentUser._id))
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }

  const rejectRequest = async (id) => {
    console.log('reject', id)
    try {
      const res = await api.rejectfriendrequest(id)

      Toast.show({
        type: "success",
        text1: "Message",
        text2: res.data.message,
      });

    } catch (err) {
      console.log(err)
      Toast.show({
        type: "error",
        text1: "Message",
        text2: err,
      });
    }
    // declare the data fetching function
    const fetchData = async () => {
      dispatch(getfriendrequests(currentUser._id))
      dispatch(getUser(currentUser._id))
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }

  const unfriend = async (id) => {
    console.log('unfriend', id)
    try {
      const res = await api.unfriend(id)

      Toast.show({
        type: "success",
        text1: "Message",
        text2: res.data.message,
      });

    } catch (err) {
      console.log(err)
      Toast.show({
        type: "error",
        text1: "Message",
        text2: err,
      });
    }

    // declare the data fetching function
    const fetchData = async () => {
      dispatch(getfriendrequests(currentUser._id))
      dispatch(getUser(currentUser._id))
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

  }

  const readMessage = async (data) => {
    console.log('readMessage, data', data.users, data.users.fullname)

    navigation.navigate("Livechat", {
      id: data.users[0]._id,
      fullname: data.users[0].fullname,
    })
  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Notifications"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={35}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{ color: "#4D4D4D", fontFamily: "Poppins", fontSize: 14, fontWeight: 500, marginTop: 20, marginLeft: 15 }}>Friend Request</Text>
            <Card style={{ margin: 10 }}>
              <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
                {(friendRequests) && friendRequests.map((friendRequest, index) => (
                  <View key={index} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, }}>
                    <View style={{ marginTop: 10, marginLeft: 15, fontWeight: 600 }} >
                      <Text style={{}}>{friendRequest.sender.fullname}</Text>
                      <Text>{friendRequest.sender.email}</Text>
                    </View>
                    <View style={[style.row, { paddingLeft: 50, paddingTop: 12 }]}>
                      <View style={[style.row, { paddingRight: 10 }]}>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          style={{ backgroundColor: Colors.btn, borderColor: 'black', borderRadius: 5, paddingHorizontal: 10, marginBottom: 5 }}
                          onPress={() => { accecptRequest(friendRequest.sender._id) }}>
                          <Text style={{ ...style.cardbtntxt, color: Colors.bord }}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ backgroundColor: Colors.warn, borderColor: 'black', borderRadius: 5, paddingHorizontal: 10 }}
                          onPress={() => { rejectRequest(friendRequest.sender._id) }}>
                          <Text style={{ ...style.cardbtntxt, color: Colors.bord }}>
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                ))}

              </Card.Content>
            </Card>
          </View>
          <View>
            <Text style={{ color: "#4D4D4D", fontFamily: "Poppins", fontSize: 14, fontWeight: 500, marginTop: 20, marginLeft: 15 }}>Friend List</Text>
            <Card style={{ margin: 10 }}>
              <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
                {(currentUser.friendList) && currentUser.friendList.map((currentFriend, index) => (
                  <View key={index} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, }}>
                    <View style={{ marginTop: 10, marginLeft: 15, fontWeight: 600 }} >
                      <Text style={{}}>{currentFriend.fullname}</Text>
                      <Text>{currentFriend.email}</Text>
                    </View>
                    <View style={[style.row, { paddingLeft: 50, paddingTop: 12 }]}>
                      <View style={[style.row, { paddingRight: 10 }]}>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          style={{ backgroundColor: 'red', borderColor: 'black', borderRadius: 5, paddingHorizontal: 10 }}
                          onPress={() => { unfriend(currentFriend._id) }}
                        >
                          <Text style={style.textalign}>
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                ))}

              </Card.Content>
            </Card>
          </View>
          <View>
            <Text style={{ color: "#4D4D4D", fontFamily: "Poppins", fontSize: 14, fontWeight: 500, marginTop: 20, marginLeft: 15 }}>Un Read Messages</Text>
            <Card style={{ margin: 10 }}>
              <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
                {(unReadMessages) && unReadMessages.map((unReadMessage, index) => (
                  (unReadMessage.num) ? (<View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, }}>
                    <View key={index} style={{ marginTop: 10, marginLeft: 15, fontWeight: 600 }} >
                      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text >{unReadMessage.users[0].fullname}</Text>
                        <Text style={{ backgroundColor: Colors.btn, borderRadius: 10, paddingHorizontal: 8, marginLeft: 10, ...style.cardbtntxt }}>{unReadMessage.num}</Text>
                      </View>
                    </View>
                    <View style={[style.row, { paddingLeft: 50, paddingTop: 12 }]}>
                      <View style={[style.row, { paddingRight: 10 }]}>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          style={{ backgroundColor: Colors.btn, borderColor: 'black', borderRadius: 5, paddingHorizontal: 10 }}
                          onPress={() => { readMessage(unReadMessage) }}
                        >
                          <Text style={{ ...style.cardbtntxt, color: Colors.bord }}>
                            Read
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>) : (<View></View>)
                ))}
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
