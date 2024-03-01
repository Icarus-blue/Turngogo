import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Modal,
    ImageBackground,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import { EventRegister } from "react-native-event-listeners";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
    const theme = useContext(themeContext);
    const [darkMode, setDarkMode] = useState("false");

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
            <AppBar
                color={theme.bg}
                title="Search People"
                titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
                centerTitle={true}
                elevation={0}
                style={{ backgroundColor: "#FFFFFF" }}
                leading={
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Avatar.Icon
                            icon="arrow-left"
                            style={{ backgroundColor: "#FFFFFF" }}
                            color="black"
                            size={40}
                        />
                    </TouchableOpacity>
                }
            />
            <View style={[style.main, { backgroundColor: theme.bg }]}>
                <View style={{ padding: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5 }}>
                        <Icon name="search-outline" size={25} style={{ marginHorizontal: 10 }}></Icon>
                        <TextInput placeholder="Search People" style={{ flex: 1 }}></TextInput>
                    </View>
                    <Text style={{ fontSize: 20, marginTop: 30, fontWeight: 700 }}>
                        Search
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>

                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>

                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>

                        <View>
                            <View style={{
                                height: 124, width: 137, backgroundColor: '#C4C4C4'
                            }}></View>
                            <Text style={{ color: '#1B1E28', fontSize: 13, marginTop: 6 }}>Niladri Reservoir</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
