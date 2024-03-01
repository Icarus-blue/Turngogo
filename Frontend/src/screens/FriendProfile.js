import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import themeContext from "../theme/themeContex";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from 'react-native-paper';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { api } from "../api";
import Toast from "react-native-toast-message";
import { Buffer } from 'buffer'
import SocketContext from "../socketContext";
import { useSelector } from "react-redux";
import { showToast } from "../components/ShowToast";

export default function FriendProfile({ route, navigation }) {
  const theme = useContext(themeContext);
  const [existingAdd, setExistingAdd] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      <AppBar
        color={theme.bg}
        title="Friends Profile"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#FFFFFF" }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("FindGymflexers")}
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

      <ScrollView >
        <View style={{ backgroundColor: '#D9D9D9', height: 174, margin: 30 }}>
          <Avatar.Image source={require('../../assets/image/f1.jpg')} style={{ alignSelf: 'center', marginTop: 30 }}>
          </Avatar.Image>
          <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 13, marginTop: 16 }}>Alein Connell</Text>
          <Text style={{ fontSize: 10, textAlign: 'center' }}>Score 738</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30, marginTop: 10 }}>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#D9D9D9', width: 100, borderRadius: 14, padding: 3 }}>
              <Text style={{ textAlign: 'center' }}>Dairy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#D9D9D9', width: 100, borderRadius: 14, padding: 3 }}>
              <Text style={{ textAlign: 'center' }}>Message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#D9D9D9', width: 150, borderRadius: 14, padding: 3 }}>
              <Text style={{ textAlign: 'center' }}>Add as a Friend</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
