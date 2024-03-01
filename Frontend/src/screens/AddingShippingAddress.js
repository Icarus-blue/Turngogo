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
import { Checkbox } from 'react-native-paper';

export default function Cart() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <AppBar
                color={theme.bg}
                title="Adding Shipping Address"
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
                    <View style={{ backgroundColor: "white", padding: 10 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            // onChangeText={handleTitleInput}
                            // value={title}
                            placeholder="Full name"
                        />
                    </View>

                    <View style={{ backgroundColor: "white", padding: 10, marginTop: 20 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            // onChangeText={handleTitleInput}
                            // value={title}
                            placeholder="Address"
                        />
                    </View>

                    <View style={{ backgroundColor: "white", padding: 10, marginTop: 20 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            // onChangeText={handleTitleInput}
                            // value={title}
                            placeholder="State/Province/Region"
                        />
                    </View>

                    <View style={{ backgroundColor: "white", padding: 10, marginTop: 20 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            // onChangeText={handleTitleInput}
                            // value={title}
                            placeholder="Zip Code (Postal Code)"
                        />
                    </View>

                    <View style={{ backgroundColor: "white", padding: 10, marginTop: 20 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            // onChangeText={handleTitleInput}
                            // value={title}
                            placeholder="Country"
                        />
                    </View>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: '#A1A1A1', borderRadius: 25, padding: 15, marginTop: 50 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 700 }}>Save Address</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView >
        </SafeAreaView >
    );
}
