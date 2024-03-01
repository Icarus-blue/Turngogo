import {
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Alert
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { AppBar } from "@react-native-material/core";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { api } from "../api";

export default function Mydiary() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <AppBar
                color={theme.bg}
                title="My Diary"
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
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 80 }}>
                <View style={{ margin: 50, marginTop: 20, flex: 1, flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SavedDiary')}>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, borderRadius: 20, flex: 1, padding: 20, flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Icon name="lock-closed" size={20} style={{ color: '#A7A1A1' }}></Icon>
                                <Text style={{ color: '#999EA9', fontSize: 12 }}>15 March, 2021</Text>
                            </View>
                            <Text style={{ color: "#AFBFE0", fontSize: 14, alignSelf: "flex-end" }}>Time</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>Smart Mall Ride</Text>
                                <Text>15:45 AM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
