import {
    View,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function AddDiary() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [polylineCoordinates, setPolylineCoordinates] = useState([]);
    const [isFirstStepChecked, setFirstStep] = useState(null);
    const [isSecondStepChecked, setSecondStep] = useState(null);
    const [isThirdStepChecked, setThirdStep] = useState(null);
    const [counter, setCounter] = useState(3);
    const [isFourthStepChecked, setFourthStep] = useState(null)
    const [timer, setTimer] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval;
        if (isThirdStepChecked) {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isThirdStepChecked]);

    useEffect(() => {
        let interval;

        if (isFourthStepChecked && !isPaused) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isFourthStepChecked, isPaused]);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking((prevIsBlinking) => !prevIsBlinking);
        }, 400);

        return () => clearInterval(blinkInterval);
    }, []);

    const handlePause = () => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };


    useEffect(() => {
        if (counter === 0) {
            setThirdStep(null);
            setCounter(3);
            setSecondStep(null)
            setFourthStep(true);
            setFirstStep(true)

        }
    }, [counter]);

    const handleStart = (coordinate) => {
        setStartPoint(coordinate);
        setPolylineCoordinates([...polylineCoordinates, coordinate]);
    };

    const handleEnd = (coordinate) => {
        setEndPoint(coordinate);
        if (!startPoint) {
            setPolylineCoordinates([]);
        } else {
            setPolylineCoordinates([startPoint, coordinate]);
        }
    };

    const resetStartPoint = () => {
        setStartPoint(null);
        setPolylineCoordinates([]);
    };

    const resetEndPoint = () => {
        setEndPoint(null);
        setPolylineCoordinates([]);
    };

    const handleFinish = () => {
        Alert.alert(
            "Finish Ride",
            "Are you sure to finish the ride?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        navigation.navigate('SaveDiary')
                    },
                },
                {
                    text: "No",
                    style: "cancel",
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView
            style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
        >
            <StatusBar
                backgroundColor={theme.bg}
                barStyle={theme.barStyle}
            />
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/turngogo/splashscreen/logo.png')}
                            style={{ width: 40, height: 40 }}></Image>
                        <Image source={require('../../assets/turngogo/splashscreen/turngogo.png')}
                            style={{ width: 73, height: 40 }}></Image>
                    </View>

                </View>
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={(e) => {
                            const coordinate = e.nativeEvent.coordinate;
                            if (!startPoint) {
                                handleStart(coordinate);
                            } else {
                                handleEnd(coordinate);
                            }
                        }}
                    >
                        {startPoint && (
                            <Marker coordinate={startPoint} title="Start Point" onPress={resetStartPoint} />
                        )}
                        {endPoint && (
                            <Marker coordinate={endPoint} title="End Point" onPress={resetEndPoint} />
                        )}
                        {polylineCoordinates.length > 1 && (
                            <Polyline coordinates={polylineCoordinates} strokeColor="#FF0000" strokeWidth={3} />
                        )}
                    </MapView>
                    <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center', }}>
                        {!isFirstStepChecked && !isSecondStepChecked && !isThirdStepChecked && !isFourthStepChecked && startPoint && endPoint && (
                            <TouchableOpacity
                                style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5 }}
                                onPress={() => {
                                    setFirstStep(true);
                                }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center' }}>Start </Text>
                            </TouchableOpacity>
                        )}
                        {isFirstStepChecked && !isSecondStepChecked && !isThirdStepChecked && !isFourthStepChecked && (
                            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                    onPress={() => {
                                        setSecondStep(true);
                                        setFirstStep(false);
                                    }}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Walk </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5 }}
                                    onPress={() => {
                                        setSecondStep(true);
                                        setFirstStep(false);
                                    }}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Ride </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {isSecondStepChecked && !isThirdStepChecked && !isFourthStepChecked && (
                            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                    onPress={() => setThirdStep(true)}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Private </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                    onPress={() => setThirdStep(true)}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Public  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                    onPress={() => setThirdStep(true)}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Friends  </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {isThirdStepChecked && !isFourthStepChecked && (
                            <View style={{
                                position: 'absolute',
                                backgroundColor: 'transparent',
                                bottom: 150,
                                borderRadius: 300,
                                borderWidth: 10,
                                width: 300,
                                height: 300,
                                borderColor: "#BEBEBE",
                                alignSelf: 'center'
                            }}>

                                <Text style={{ color: 'grey', fontSize: 35, fontWeight: 700, textAlign: 'center', marginTop: 100 }}>Let's start!</Text>
                                <Text style={{ color: 'grey', fontSize: 35, fontWeight: 700, textAlign: 'center', marginTop: 10 }}>{counter}...</Text>

                            </View>
                        )}
                        {isFourthStepChecked && (
                            <View>
                                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                        onPress={() => setThirdStep(true)}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Camera </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                        onPress={handlePause}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Pause  </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ backgroundColor: 'grey', width: 100, padding: 10, borderRadius: 5, marginHorizontal: 20 }}
                                        onPress={handleFinish}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Finish </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ fontSize: 18, color: 'red' }}>
                                        {isPaused ? (
                                            <>
                                                {isBlinking ? '' : formatTime(timer)}
                                            </>
                                        ) : (
                                            <>
                                                {formatTime(timer)}
                                            </>
                                        )}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
