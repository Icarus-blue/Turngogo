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

export default function ProductDetail() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <AppBar
                color={theme.bg}
                title="product details"
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
                <View >
                    <ProductionSlider />

                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                            <Text style={{ fontWeight: 500, fontSize: 24, marginLeft: 30 }}>
                                Road Bike
                            </Text>
                        </View>
                        <View style={{ padding: 30, paddingTop: 10 }}>
                            <Text style={{ color: '#999EA9', fontFamily: 'Avenir LT Pro', fontSize: 13 }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                            </Text>
                        </View>
                    </View>

                    <View style={{ margin: 40, marginTop: 0, borderWidth: 1, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
                            <Icon name="cart" size={30}></Icon>
                            <Text style={{ fontWeight: 700, fontSize: 16 }}>
                                Add to Cart
                            </Text>
                            <Text style={{ fontWeight: 700, fontSize: 16 }}>$ 25</Text>
                        </View>

                        <View style={{ borderWidth: 1, height: 30, width: 60, marginTop: 20,marginBottom:10,alignSelf:'center' }}>
                            <Text style={{ textAlign: 'center' }}>Cart</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
