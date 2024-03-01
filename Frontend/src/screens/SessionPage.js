
import React, { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { View, Text, Button, TouchableOpacity, SafeAreaView, } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { calculator } from '../utils/transactionCalculator';
import { api } from '../api';
import { showToast } from '../components/ShowToast';
import { useDispatch, useSelector } from 'react-redux';
import { GET_WALLET_AMOUNT } from '../redux/actionTypes';
const TimerScreen = ({ route }) => {
    const [startTime, setStartTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [sessionTime, setSessionTime] = useState(null);
    const [sessionstart, setSessionstart] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);
    const [bill, setBill] = useState(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isAccepted, setAccept] = useState(false);
    const { getlocalgymid } = useSelector(state => state.common);
    const gymid = route.params.id;

    useEffect(() => {
        console.log(route.params.id)
    }, [])

    const acceptPay = async () => {
        try {
            const res = api.payToLocalGym({ gymid: gymid, amount: bill, sessionTime: sessionTime });
            showToast('success', 'Payment Success', `You successfully paied your bill $ ${bill}`)
            dispatch({type:GET_WALLET_AMOUNT,payload : (await res).data.remaindmoney})
        } catch (error) {

        }
    }

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
                setSessionstart(true);
                handleStartTimer()
                return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
            }}
        >
            {({ remainingTime }) => <Text>{remainingTime}s</Text>}
        </CountdownCircleTimer>
    )

    useEffect(() => {
        if (startTime) {
            const intervalId = setInterval(() => {
                setCurrentTime(Date.now());
            }, 0);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [startTime]);

    const handleStartTimer = () => {
        setStartTime(null);
        setCurrentTime(null);
        setTimeout(() => {
            setStartTime(Date.now());
        }, 0);
    };

    const handleCloseTimer = () => {
        setSessionTime(formatTime(currentTime)); // Store the session time
        setStartTime(null);
        setCurrentTime(null);
        const moneyPaid = calculator.localgymCalculator(formatTime(currentTime))
        setBill(moneyPaid);
    };

    const formatTime = (time) => {
        const elapsedSeconds = Math.floor((time - startTime) / 1000);
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <AppBar
                color={"white"}
                title='Session Management'
                titleStyle={{ color: "black", fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
                centerTitle={false}
                elevation={0}
                style={{ backgroundColor: "transparent", marginTop: 20 }}
                leading={
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Homepage")}
                    >
                        <Avatar.Icon
                            icon="arrow-left"
                            style={{ backgroundColor: "transparent" }}
                            color="black"
                            size={40}
                        />
                    </TouchableOpacity>
                }
            />
            {sessionstart ?
                (
                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        {startTime ? (
                            <>
                                <Text style={{ fontSize: 24 }}>Time since login started:</Text>
                                <Text style={{ fontSize: 48, fontWeight: 'bold', marginVertical: 16 }}>{formatTime(currentTime)}</Text>
                                <Button title="Close Timer" onPress={handleCloseTimer} />
                            </>
                        ) : (
                            <>
                                {sessionTime && (
                                    <>
                                        <Text style={{ fontSize: 24, marginBottom: 20 }}>Session Time: {sessionTime}</Text>
                                        <Text style={{ fontSize: 24, marginBottom: 20 }}>You need to pay  {bill} $ for our services</Text>
                                        <Button title='Accept' onPress={acceptPay}></Button>
                                    </>
                                )}

                            </>
                        )}
                    </View>
                ) :
                (
                    <>
                        <Text style={{ alignSelf: 'center', marginTop: 50, fontSize: 20 }}>
                            Session will be start in 5 minutes
                        </Text>
                        <View style={{ alignSelf: 'center', marginTop: 100 }}>
                            <UrgeWithPleasureComponent />
                        </View>
                    </>
                )
            }



        </SafeAreaView>
    );
};
export default TimerScreen;