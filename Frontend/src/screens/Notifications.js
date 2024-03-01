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

export default function Notifications() {
    const theme = useContext(themeContext);
    const [darkMode, setDarkMode] = useState("false");

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
            <AppBar
                color={theme.bg}
                title="Notifications"
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontStyle: 'italic',fontWeight:600 }}>
                            Recent
                        </Text>

                        <Text style={{ fontStyle: 'italic',fontWeight:600 }}>
                            Earlier
                        </Text>

                        <Text style={{ fontStyle: 'italic',fontWeight:600 }}>
                            Archieved
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
