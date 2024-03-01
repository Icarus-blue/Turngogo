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
                title="Cart"
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

                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 21, flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ backgroundColor: '#C4C4C4', width: 85, height: 74, flex: 1.3 }}>

                        </View>
                        <View style={{ flex: 1.7, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                MERIDA- Speeder
                            </Text>
                            <Text style={{ fontWeight: 700, fontSize: 14, marginTop: 20 }}>
                                $45
                            </Text>
                        </View>
                        <View style={{ flex: 1.6, marginLeft: 10 }}>
                            <Icon name="trash" size={20} style={{ alignSelf: 'flex-end' }}></Icon>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                <Icon name="remove-circle-outline" size={25}>

                                </Icon>
                                <Text>1</Text>
                                <Icon name="add-circle-outline" size={25}>

                                </Icon>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 21, flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ backgroundColor: '#C4C4C4', width: 85, height: 74, flex: 1.3 }}>

                        </View>
                        <View style={{ flex: 1.7, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                MERIDA- Speeder
                            </Text>
                            <Text style={{ fontWeight: 700, fontSize: 14, marginTop: 20 }}>
                                $45
                            </Text>
                        </View>
                        <View style={{ flex: 1.6, marginLeft: 10 }}>
                            <Icon name="trash" size={20} style={{ alignSelf: 'flex-end' }}></Icon>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                <Icon name="remove-circle-outline" size={25}>

                                </Icon>
                                <Text>1</Text>
                                <Icon name="add-circle-outline" size={25}>

                                </Icon>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 21, flexDirection: 'row' }}>
                        <View style={{ backgroundColor: '#C4C4C4', width: 85, height: 74, flex: 1.3 }}>

                        </View>
                        <View style={{ flex: 1.7, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                MERIDA- Speeder
                            </Text>
                            <Text style={{ fontWeight: 700, fontSize: 14, marginTop: 20 }}>
                                $45
                            </Text>
                        </View>
                        <View style={{ flex: 1.6, marginLeft: 10 }}>
                            <Icon name="trash" size={20} style={{ alignSelf: 'flex-end' }}></Icon>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                <Icon name="remove-circle-outline" size={25}>

                                </Icon>
                                <Text>1</Text>
                                <Icon name="add-circle-outline" size={25}>

                                </Icon>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ color: '#AFBFE0', fontSize: 16, fontWeight: 700 }}>
                            Total (3 iteams):
                        </Text>
                        <Text style={{ fontWeight: 700, fontSize: 25 }}>
                            $82.00
                        </Text>
                    </View>

                    <View style={{ borderWidth: 1, width: 400, height: 50, marginTop: 30, flexDirection: 'row', borderRadius: 5, justifyContent: 'space-around' }}>
                        <Text style={{
                            alignSelf: 'center', fontWeight: 700, fontSize
                                : 16
                        }}>Proceed to checkout</Text>
                        <TouchableOpacity style={{ alignSelf: 'center' }}>
                            <Icon name="send" size={30} ></Icon>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView >
        </SafeAreaView >
    );
}
