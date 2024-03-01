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
    TextInput
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
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import ProductionSlider from '../components/ProductionSlider';

export default function Cart() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <AppBar
                color={theme.bg}
                title="CheckOut"
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

            <ScrollView>
                <View style={{ margin: 30 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 30 }}>Shipping address</Text>
                    <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Jane Doe</Text>
                            <Text style={{ fontWeight: 500 }}>Change</Text>
                        </View>
                        <Text style={{ marginTop: 20 }}>
                            3 Newbridge Court
                        </Text>
                        <Text>
                            Chino Hills, CA 91709, United States
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', padding: 30 }}>
                        <Text style={{ fontWeight: 500 }}>Payment</Text>
                        <Text style={{ fontWeight: 500 }}>
                            Change
                        </Text>
                    </View>

                    <Text style={{ textAlign: 'center', color: '#222222' }}>**** **** **** 3947</Text>

                    <View style={{ padding: 30 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                            <Text style={{ color: '#9B9B9B' }}>Order:</Text>
                            <Text style={{ color: '#222222' }}>
                                545
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9B9B9B' }}>Delivery:</Text>
                            <Text style={{ color: '#222222' }}>
                                545
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9B9B9B', fontWeight: 700 }}>Summary:</Text>
                            <Text style={{ color: '#222222' }}>
                                545
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: '#A1A1A1', borderRadius: 25, padding: 15 ,marginTop:50}}>
                            <Text style={{ color: 'white', textAlign: 'center',fontWeight:700 }}>SUBMIT ORDER</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
}
