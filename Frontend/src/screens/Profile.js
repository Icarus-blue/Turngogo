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

export default function Profile() {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState("false");

  const navigation = useNavigation();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
      <AppBar
        color={theme.bg}
        title="Profile"
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
        <Text style={{ textAlign: 'center', marginTop: 3, fontSize: 10 }}>Leonardo@gmail.com</Text>
        <View style={{ alignSelf: 'flex-end', marginRight: 30 }}>
          <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ flexDirection: 'row' }}>
            <Icon name="create-outline" size={20}></Icon>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              Score
            </Text>
            <Text>
              Diary
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text>
              346
            </Text>
            <Text>
              12
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
            <View>
              <View style={{ backgroundColor: '#C4C4C4', height: 124, width: 137 }}></View>
              <Text style={{ color: '#1B1E28', marginTop: 5 }}>Niladri Reservoir</Text>
            </View>
            <View>
              <View style={{ backgroundColor: '#C4C4C4', height: 124, width: 137 }}></View>
              <Text style={{ color: '#1B1E28', marginTop: 5 }}>Casa Las Tirtugas</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
            <View>
              <View style={{ backgroundColor: '#C4C4C4', height: 124, width: 137 }}></View>
              <Text style={{ color: '#1B1E28', marginTop: 5 }}>Niladri Reservoir</Text>
            </View>
            <View>
              <View style={{ backgroundColor: '#C4C4C4', height: 124, width: 137 }}></View>
              <Text style={{ color: '#1B1E28', marginTop: 5 }}>Casa Las Tirtugas</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
