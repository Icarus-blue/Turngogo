import {
    View,
    Text,
    Switch,
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
import { Colors } from "../theme/color";

export default function Profile() {
    const theme = useContext(themeContext);
    const [darkMode, setDarkMode] = useState("false");

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
            <AppBar
                color={theme.bg}
                title="Edit Profile"
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
                <Avatar.Image source={require('../../assets/image/f1.jpg')} style={{ alignSelf: 'center', marginTop: 30 }}>
                </Avatar.Image>

                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>Leonardo</Text>
                <Text style={{ textAlign: 'center', marginTop: 3, fontSize: 10 }}>Change Profile Picture</Text>

                <View style={{ padding: 30 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10 }}>First Name</Text>
                        <TextInput placeholder="Leonardo "
                            selectionColor={Colors.primary}
                            placeholderTextColor={Colors.disable}
                            style={[style.txtinput, { backgroundColor: theme.bg, fontStyle: "italic" }]}>

                        </TextInput>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10 }}>Last Name</Text>
                        <TextInput placeholder="Ahmed"
                            selectionColor={Colors.primary}
                            placeholderTextColor={Colors.disable}
                            style={[style.txtinput, { backgroundColor: theme.bg, fontStyle: "italic" }]}>

                        </TextInput>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10 }}>Location</Text>
                        <TextInput placeholder="Sylhet Bangladesh"
                            selectionColor={Colors.primary}
                            placeholderTextColor={Colors.disable}
                            style={[style.txtinput, { backgroundColor: theme.bg, fontStyle: "italic" }]}>

                        </TextInput>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10 }}>Mobile Number</Text>
                        <TextInput placeholder="+88 01758-000666"
                            selectionColor={Colors.primary}
                            placeholderTextColor={Colors.disable}
                            style={[style.txtinput, { backgroundColor: theme.bg, fontStyle: "italic" }]}>

                        </TextInput>
                    </View>

                    <TouchableOpacity style={{ padding: 30 }}>
                        <View style={{ backgroundColor: '#A1A1A1', borderRadius: 25, padding: 15, marginTop: 50 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 700 }}>Save Address</Text>
                        </View>
                    </TouchableOpacity>

                </View>



            </View>
        </SafeAreaView>
    );
}
