import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import style from "./theme/style";
import Slides from "./Slides";
import { Colors } from "./theme/color";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default function IntroItem({ item }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ width: width }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={{ flex: 2 }}>
        <Image
          source={item.bg}
          style={{ width: width, height: height*1.2 }}
        ></Image>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.footbackground,
          paddingHorizontal: 18,
          paddingTop:40,
          paddingLeft: 30,
          borderTopRightRadius: 50,
          paddingBottom: 90,
        }}
      >
        <Text style={[style.title]}>{item.title1}</Text>
        <Text style={[style.title]}>{item.title2}</Text>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt]}>{item.subtitle}</Text>
        </View>
      </View>
      {/* <View style={{ flexDirection: 'row' }}>
            <Avatar.Icon icon="chevron-left" 
                    size={20} 
                    style={{ backgroundColor: '#FE970F', }} 
                    color='white' />
            <TouchableOpacity>
                <Text style={style.txt}>Skip</Text>
            </TouchableOpacity>

            </View> */}
    </SafeAreaView>
  );
}
