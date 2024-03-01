import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import IntroItem from "./IntroItem";
import Slides from "./Slides";
import style from "./theme/style";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { Colors } from "./theme/color";
import themeContext from "./theme/themeContex";
import { storage } from "./utils/storage";
import { store } from "./redux/store";
import { SKIP_INTRO } from "./redux/actionTypes";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Introduction() {
  const ref = React.useRef(null);
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const theme = useContext(themeContext);
  const HandleSkip = async () => {
    await storage.setItem("skipIntro", true);
    store.dispatch({ type: SKIP_INTRO, payload: true });
    navigation.navigate("FinalOnBoarding");
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const intro = storage.getItem("skipIntro");
        if (intro == "true") navigation.navigate("FinalOnBoarding");
      } catch (e) {}
    };
    fetch();
  }, []);

  const Footer = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 18,
            marginBottom: 30,
          }}
        >
          {currentSlideIndex == 0 ? (
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={goNextSlide}>
                <Avatar.Icon
                  icon="chevron-right"
                  size={60}
                  style={{ backgroundColor: Colors.btn }}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={HandleSkip} style={{ marginLeft: 10 }}>
                <Text style={[style.txt, { color: "#BDBDBD" }]}>Skip</Text>
              </TouchableOpacity>
            </View>
          ) : currentSlideIndex == 1 ? (
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={goNextSlide}>
                <Avatar.Icon
                  icon="chevron-right"
                  size={60}
                  style={{ backgroundColor: Colors.btn }}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={HandleSkip} style={{ marginLeft: 10 }}>
                <Text style={[style.txt, { color: "#BDBDBD" }]}>Skip</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("FinalOnBoarding")}
              >
                <Avatar.Icon
                  icon="chevron-right"
                  size={60}
                  style={{ backgroundColor: Colors.btn }}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={HandleSkip} style={{ marginLeft: 10 }}>
                <Text style={[style.txt, { color: "#BDBDBD" }]}>Skip</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            marginBottom: 20,
            paddingRight: 20,
          }}
        >
          {Slides.map((_, index) => (
            <View
              key={index}
              style={[
                style.indicator,
                currentSlideIndex === index && {
                  borderColor: "white",
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  backgroundColor: "white",
                  alignItems: "center",
                  marginHorizontal: 5,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != Slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={Slides}
        ref={ref}
        renderItem={({ item }) => <IntroItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </SafeAreaView>
  );
}
