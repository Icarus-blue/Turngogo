import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser } from "../redux/actions/auth";
import { api } from "../api";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";

export default function FriendRequest() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <AppBar
                color={theme.bg}
                title="Friend Requests"
                titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
                centerTitle={true}
                elevation={0}
                style={{ marginTop: 30 }}
                leading={
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
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
                <View style={[style.viewstyle, { flexDirection: 'column', flex: 1, padding: 30 }]}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ marginBottom: 10 }}>New</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar.Image source={require('../../assets/image/chat1.png')} size={50}>
                            </Avatar.Image>
                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: 30 }}>
                                <Text style={{ fontSize: 13 }}>Requests</Text>
                                <Text style={{ fontSize: 8 }}>Approve or ignore Requests</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Today</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Avatar.Image source={require('../../assets/image/chat1.png')} size={50}>
                            </Avatar.Image>

                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: 30, marginRight: 50 }}>
                                <Text style={{ fontSize: 13 }}>Alein Connell</Text>
                                <Text style={{ fontSize: 8 }}>Approve or ignore Requests</Text>
                            </View>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center', marginRight: 10 }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Confirm</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Today</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Avatar.Image source={require('../../assets/image/chat1.png')} size={50}>
                            </Avatar.Image>

                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: 30, marginRight: 50 }}>
                                <Text style={{ fontSize: 13 }}>Alein Connell</Text>
                                <Text style={{ fontSize: 8 }}>Approve or ignore Requests</Text>
                            </View>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center', marginRight: 10 }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Confirm</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Today</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Avatar.Image source={require('../../assets/image/chat1.png')} size={50}>
                            </Avatar.Image>

                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: 30, marginRight: 50 }}>
                                <Text style={{ fontSize: 13 }}>Alein Connell</Text>
                                <Text style={{ fontSize: 8 }}>Approve or ignore Requests</Text>
                            </View>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center', marginRight: 10 }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Confirm</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ width: 70, backgroundColor: '#D9D9D9', height: 20, borderRadius: 9, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 9, textAlign: 'center' }}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
