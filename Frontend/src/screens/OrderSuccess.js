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

            <View style={{ width: 174, height: 158, backgroundColor: '#D9D9D9', marginTop: 200, alignSelf: 'center' }}>
            </View>

            <Text style={{ fontSize: 34, fontFamily: 'Metropolis', textAlign: 'center', fontWeight: 700, marginTop: 50 }}>
                Success
            </Text>

            <Text style={{ fontSize: 14, fontWeight: 400, textAlign: 'center', padding: 100, paddingTop: 20 }}>
                Your order will be delivered soon.
                Thank you for choosing our app!
            </Text>

            <TouchableOpacity style={{padding:30}}>
                <View style={{ backgroundColor: '#A1A1A1', borderRadius: 25, padding: 15, marginTop: 50 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 700 }}>Save Address</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
