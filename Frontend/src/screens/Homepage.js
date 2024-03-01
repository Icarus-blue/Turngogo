import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { api } from "../api";
import UsersDiarySlider from '../components/UsersDiarySlider';

export default function Homepage() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    firstviewstyle: {
      flex: 0.4,
      flexDirection: "row",
      padding: 20,
      justifyContent: 'space-between'
    },
    secondviewstyle: {
      flex: 5,
    },

  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[style.viewstyle, { flexDirection: 'column', flex: 1 }]}
        >
          <View style={styles.firstviewstyle}>
            <View style={{
              backgroundColor: '#D9D9D9',
              width: 180,
              height: 50,
              borderRadius: 40,
              padding: 5,
              flexDirection: 'row'
            }}>
              <Avatar.Image size={40} source={require('../../assets/image/f1.jpg')} />
              <Text style={{ fontSize: 15, alignSelf: 'center', paddingLeft: 20 }}>Alenjendar</Text>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: "center" }}>
              <TouchableOpacity>
                <Icon name="person-add-outline" size={23}></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="notifications-outline" size={30}></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="search-outline" size={23}></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondviewstyle}>
            <UsersDiarySlider></UsersDiarySlider>
            <UsersDiarySlider></UsersDiarySlider>
            <UsersDiarySlider></UsersDiarySlider>          
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
