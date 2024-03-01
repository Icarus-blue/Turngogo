import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler, SafeAreaView, } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { api } from '../api';
import { showToast } from '../components/ShowToast';
import { SET_LOCALGYM_ID } from '../redux/actionTypes';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Scan = (route) => {
    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);
    const navigation = useNavigation()
    const gymid = route.route.params.id;
    const dispatch = useDispatch();

    const onSuccess = (e) => {
        setResult(e);
        setScan(false);
        setScanResult(true);
        sendRequest();
        navigation.navigate('SessionPage')
    };

    const sendRequest = async () => {
        try {
            console.log('========>', gymid);
            const res = await api.sendRequestToLocalGymAdmin(gymid);
            if (res.data.status) {                
                dispatch({ type: SET_LOCALGYM_ID, payload: gymid })
                showToast('success', 'Local Gym Register', 'Successfully Joined , Session will be started within 20mins.')
            } else {

            }
        } catch (err) {
        }
    }

    const activeQR = () => {
        setScan(true);
    };

    const scanAgain = () => {
        setScan(true);
        setScanResult(false);
    };

    return (
        <>
            <View style={styles.scrollViewStyle}>
                <AppBar
                    color={"white"}
                    title="QR code Scanning"
                    titleStyle={{ color: "white", fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
                    centerTitle={false}
                    elevation={0}
                    style={{ backgroundColor: "transparent", marginTop: 20 }}
                    leading={
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Avatar.Icon
                                icon="arrow-left"
                                style={{ backgroundColor: "transparent" }}
                                color="white"
                                size={40}
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                    </TouchableOpacity>
                </View>
                {!scan && !ScanResult && (
                    <View style={styles.cardView}>

                        <Text numberOfLines={8} style={styles.descText}>
                            Please move your camera {"\n"} over the QR Code
                        </Text>
                        {/* <ActivityIndicator size="small" color="#0000ff" /> */}
                        <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
                            <View style={styles.buttonWrapper}>
                                <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Scan QR Code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {scan && (
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { this.scanner = node }}
                        onRead={onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                Please move your camera {"\n"} over the QR Code
                            </Text>
                        }
                        bottomContent={
                            <View>
                                <TouchableOpacity
                                    style={styles.buttonScan2}
                                    onPress={() => this.scanner.reactivate()}
                                    onLongPress={() => setScan(false)}
                                >
                                </TouchableOpacity>
                            </View>
                        }
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2196f3'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '5%',
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#258ce3',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 0,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
        width: deviceWidth,
        height: 120,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    }
})

export default Scan;