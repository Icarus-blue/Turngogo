
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const ProductionSlider = () => {
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
        <View style={{ padding: 30 }}>

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

export default ProductionSlider;



