
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const UsersDiarySlider = () => {
  const handleImagePress = (index) => {
    console.log(`Image ${index + 1} pressed!`);
  };
  const navigation = useNavigation();

  const sliderstyle = StyleSheet.create({
    username: {
      alignSelf: 'center',
      marginLeft: 15
    }
  })

  return (
    <View style={{ padding: 30, borderWidth: 1, margin: 20, borderRadius: 20 }}>

      <View style={{ flexDirection: 'row' }}>
        <Avatar.Image size={50} source={require('../../assets/image/f2.jpg')}>
        </Avatar.Image>
        <View>
          <Text style={sliderstyle.username}>Sajib Rahman</Text>
          <Text style={[sliderstyle.username, { fontSize: 10 }]}>21:00, 8 Oct 2022</Text>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 15, margin: 15 }}>A Ride to Mill Hill East</Text>
        <Text style={{ fontSize: 8, marginLeft: 15 }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</Text>
      </View>

      <Swiper style={[styles.wrapper, { marginTop: 20 }]} autoplay={false}>
        <View style={styles.slideContainer}>
          <Image
            source={require('../../assets/image/landscape1.jpg')}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slideContainer}>
          <Image
            source={require('../../assets/image/landscape2.jpg')}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slideContainer}>
          <Image
            source={require('../../assets/image/landscape3.jpg')}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
      </Swiper>

      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="location-outline" size={23}></Icon>
          <Text>
            Tekergat, Sunamgnj
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Icon name="stats-chart-outline" size={23}></Icon>
          <Text>777</Text>
        </View>
      </View>

      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="thumbs-up-outline" size={23}></Icon>
          <Text>
            +50
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Icon name="chatbubbles-outline" size={23}></Icon>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 340,
  },
  slideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 400,
    height: 300,
  },
});

export default UsersDiarySlider;



