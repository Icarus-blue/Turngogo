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
import { RadioButton } from 'react-native-paper';
import UsersDiarySlider from '../components/UsersDiarySlider';
// import { Image } from "react-native-svg";

export default function SaveDiary() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleTitleInput = (text) => {
        setTitle(text);
    };

    const handleDetailInput = (text) => {
        setDetail(text);
    };

    const handleButtonPress = () => {
        console.log('Input text:', inputText);
    };

    const styles = StyleSheet.create({
        imageview: {
            width: 130,
            height: 90,
            marginHorizontal: 5
        },
        imagedescription: {
            fontSize: 10,
            color: '#7D7E81',
            textAlign: 'center'
        }
    })

    const handleSave = () => {
        Alert.alert(
            "Finish Ride",
            "Are you sure to finish the ride?",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        navigation.navigate('SaveDiary')
                    },
                },             
            ],
          
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <AppBar
                color={theme.bg}
                title="Ride Details"
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
                <View
                    style={[style.viewstyle, { flexDirection: 'column', flex: 1, padding: 30 }]}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1.8, flexDirection: 'row' }}>
                            <Icon name="calendar-outline" size={20}></Icon>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 14, color: '#7D7E81' }}>Date</Text>
                                <Text style={{ fontSize: 15 }}>15 March, 2021</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon name="calendar-outline" size={20}></Icon>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 14, color: '#7D7E81' }}>Time</Text>
                                <Text style={{ fontSize: 15 }}>15:45 AM</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 30 }}>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
                            onChangeText={handleTitleInput}
                            value={title}
                            placeholder="Smart Mall Ride"
                        />

                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: 100,
                                padding: 10,
                                textAlignVertical: 'top',
                                marginTop: 30,
                                borderRadius: 5,                              
                            }}
                            onChangeText={handleDetailInput}
                            value={detail}
                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown."
                            multiline={true}
                        />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 30, justifyContent: 'space-between' }}>
                            <Text style={{
                                fontWeight: 700
                            }}>
                                Photo / Video
                            </Text>
                            <TouchableOpacity>
                                <Icon name="add-circle-outline" size={25}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape1.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape2.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape3.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape1.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape2.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/image/landscape3.jpg')} style={styles.imageview}></Image>
                                <Text style={styles.imagedescription}>724 Scores</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 30, margin: 30, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 700, fontSize: 17, marginBottom: 30, textAlign: 'center' }}>Total Stops</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>1. Andheri </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>2.  Gandhi chowk</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>3. Smart Mal</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', margin: 30, marginBottom: 10, padding: 15, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text>
                            Scores Earned
                        </Text>
                        <Text>
                            1294
                        </Text>
                    </View>
               
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
