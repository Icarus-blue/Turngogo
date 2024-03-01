import React, { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { getGymAction } from "../redux/actions/common";

const GymSlide = ({ gym }) => {
  const navigation = useNavigation();
  const { _id, image, name, location, numbers, facilities, classes } = gym;

  return (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Gymintroduction", { id: _id });
        }}
      >
        <Swiper style={styles.wrapper} autoplay={true}>
          {image.map((item, index) => {
            const imageUri = "http://localhost:5000/api/images/" + item;
            return (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                key={index}
              />
            );
          })}
        </Swiper>
        <View style={styles.content}>
          <Text style={styles.name}>Gym Name: {name}</Text>
          <Text style={styles.location}>Gym Location: {location}</Text>
          <Text style={styles.location}>Contact Number: {numbers}</Text>
          <Text style={styles.location}>Gym Facilities: {facilities}</Text>
          <Text style={styles.location}>Gym Classes: {classes}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const GymSlideElements = () => {
const { gymDetail } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGymAction());
  }, []);

  return (
    <FlatList
      data={gymDetail}
      renderItem={({ item }) => <GymSlide gym={item} />}
      keyExtractor={(item, index) => index.toString()}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    width: 400,
    height: 500,
    backgroundColor: "#e8e8e8",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
  },
});

export default GymSlideElements;