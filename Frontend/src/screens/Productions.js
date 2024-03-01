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

export default function Productions() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [filter, setfilter] = useState('');

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, padding: 20, backgroundColor: 'white' }}>

                    <Icon name="list-outline" size={30}></Icon>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/turngogo/splashscreen/logo.png')}
                            style={{ width: 40, height: 40 }}></Image>
                        <Image source={require('../../assets/turngogo/splashscreen/turngogo.png')}
                            style={{ width: 73, height: 40 }}></Image>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="cart-outline" size={30}></Icon>
                        <Icon name="person-outline" size={30}></Icon>
                    </View>

                </View>

                <View style={{ margin: 30, flexDirection: 'row' }}>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, width: 300, backgroundColor: '#E9EDF1' }}
                        onChangeText={(e) => setfilter(e)}
                        value={filter}
                        placeholder="Search here"
                    />
                    <TouchableOpacity>
                        <View style={{ width: 40, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignSelf: "center", marginLeft: 50 }}>
                            <Icon name="search-outline" size={30}></Icon>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30, marginTop: 0 }}>
                    <Text style={{ fontSize: 20 }}>
                        Category
                    </Text>
                    <Text style={{ color: '#AFBFE0' }}>
                        View All
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30, marginTop: 0 }}>
                    <View style={{ borderRadius: 4, width: 80, height: 30, borderWidth: 1, borderColor: 'black' }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center' }}>All</Text>
                    </View>
                    <View style={{ borderRadius: 4, width: 80, height: 30, borderWidth: 1, borderColor: '#E1E4EA' }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center', color: '#E1E4EA' }}>E-Bikes</Text>
                    </View>
                    <View style={{ borderRadius: 4, width: 80, height: 30, borderWidth: 1, borderColor: '#E1E4EA' }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center', color: '#E1E4EA' }}>Bags</Text>
                    </View>
                    <View style={{ borderRadius: 4, width: 80, height: 30, borderWidth: 1, borderColor: '#E1E4EA' }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center', color: '#E1E4EA' }}>Accesseries</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 30 }}>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>

                            <View style={{ flexDirection: 'column', flex: 0.5, padding: 20 }}>
                                <View style={{ backgroundColor: '#C4C4C4', width: 155, height: 160 }}>

                                </View>
                                <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                    Roads Bikes
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>
                                        $45
                                    </Text>
                                    <Text style={{ color: '#08A017', fontSize: 12 }}>
                                        in stock
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: 0.5, padding: 20 }}>

                                <View style={{ backgroundColor: '#C4C4C4', width: 155, height: 160 }}>

                                </View>
                                <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                    Roads Bikes
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>
                                        $45
                                    </Text>
                                    <Text style={{ color: '#08A017', fontSize: 12 }}>
                                        in stock
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>

                            <View style={{ flexDirection: 'column', flex: 0.5, padding: 20 }}>
                                <View style={{ backgroundColor: '#C4C4C4', width: 155, height: 160 }}>

                                </View>
                                <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                    Roads Bikes
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>
                                        $45
                                    </Text>
                                    <Text style={{ color: '#08A017', fontSize: 12 }}>
                                        in stock
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: 0.5, padding: 20 }}>

                                <View style={{ backgroundColor: '#C4C4C4', width: 155, height: 160 }}>

                                </View>
                                <Text style={{ fontWeight: 500, fontSize: 14 }}>
                                    Roads Bikes
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>
                                        $45
                                    </Text>
                                    <Text style={{ color: '#08A017', fontSize: 12 }}>
                                        in stock
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}
