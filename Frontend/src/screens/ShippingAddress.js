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
                title="Shipping Address"
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

                    <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10,marginBottom:20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Jane Doe</Text>
                            <Text style={{ fontWeight: 500 }}>Edit</Text>
                        </View>
                        <Text style={{ marginTop: 20 }}>
                            3 Newbridge Court
                        </Text>
                        <Text>
                            Chino Hills, CA 91709, United States
                        </Text>
                        <View style={{ flexDirection: 'row',marginTop:10 }}>
                            <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={handleCheckboxToggle}
                                color="#007AFF"
                            />
                            <Text style={{alignSelf:'center'}}>Use as the shipping address</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10,marginBottom:20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Jane Doe</Text>
                            <Text style={{ fontWeight: 500 }}>Edit</Text>
                        </View>
                        <Text style={{ marginTop: 20 }}>
                            3 Newbridge Court
                        </Text>
                        <Text>
                            Chino Hills, CA 91709, United States
                        </Text>
                        <View style={{ flexDirection: 'row',marginTop:10 }}>
                            <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={handleCheckboxToggle}
                                color="#007AFF"
                            />
                            <Text style={{alignSelf:'center'}}>Use as the shipping address</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Jane Doe</Text>
                            <Text style={{ fontWeight: 500 }}>Edit</Text>
                        </View>
                        <Text style={{ marginTop: 20 }}>
                            3 Newbridge Court
                        </Text>
                        <Text>
                            Chino Hills, CA 91709, United States
                        </Text>
                        <View style={{ flexDirection: 'row',marginTop:10 }}>
                            <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={handleCheckboxToggle}
                                color="#007AFF"
                            />
                            <Text style={{alignSelf:'center'}}>Use as the shipping address</Text>
                        </View>
                    </View>

                    <Icon name="add-circle" size={50} style={{marginTop:30,alignSelf:'flex-end'}}></Icon>

                </View>
            </ScrollView >
        </SafeAreaView >
    );
}
