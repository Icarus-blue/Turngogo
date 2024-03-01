import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser } from "../redux/actions/auth";
import { api } from "../api";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { Checkbox } from 'react-native-paper';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';


export default function Cart() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [useDefault, setUseDefault] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    const dispatch = useDispatch()

    const handleAddCard = () => {
        // Implement logic to add card
        console.log("Card added");
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalContent: {
            flex: 0.7,
            backgroundColor: "#fff",
            padding: 20,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 10,
            marginBottom: 10,
        },
        checkboxContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#ccc",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        checkboxInner: {
            width: 12,
            height: 12,
            borderRadius: 2,
            backgroundColor: "#007AFF",
        },
        checkboxLabel: {
            fontSize: 14,
        },
        addButton: {
            backgroundColor: "#007AFF",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 4,
            alignItems: "center",
            marginTop: 20,
        },
        addButtonLabel: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <AppBar
                color={theme.bg}
                title="Payment Methods"
                titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
                centerTitle={true}
                elevation={0}
                style={{ marginTop: 30 }}
                leading={
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Avatar.Icon
                            icon="arrow-left"
                            style={{ backgroundColor: Colors.secondary }}
                            color="black"
                            size={40}
                        />
                    </TouchableOpacity>
                }
            />

            <ScrollView>
                <View style={{ padding: 30 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>
                        Your payment cards
                    </Text>

                    <View style={{ height: 250, backgroundColor: '#909090', borderRadius: 10, marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', marginTop: 200, marginLeft: 30 }}>
                            <Text style={{ color: 'white', fontSize: 10, marginRight: 30 }}>Card Holder Name</Text>
                            <Text style={{ color: 'white', fontSize: 10 }}>Expiry Date</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ color: 'white', fontSize: 14, marginRight: 30 }}>Jennyfer Doe</Text>
                            <Text style={{ color: 'white', fontSize: 14 }}>05/23</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handleCheckboxToggle}
                            color="#007AFF"
                        />
                        <Text style={{ fontWeight: 400, fontSize: 14, alignSelf: 'center' }}>Use as default payment method</Text>
                    </View>

                    <View style={{ height: 250, backgroundColor: '#909090', borderRadius: 10, marginTop: 30 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 700, alignSelf: 'flex-end', padding: 20 }}>VISA</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handleCheckboxToggle}
                            color="#007AFF"
                        />
                        <Text style={{ fontWeight: 400, fontSize: 14, alignSelf: 'center' }}>Use as default payment method</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icon name="add-circle" size={50} style={{ marginTop: 30, alignSelf: 'flex-end', marginBottom: 50 }}></Icon>
                    </TouchableOpacity>

                    <SwipeUpDownModal
                        modalVisible={modalVisible}
                        PressToanimate={() => { }}
                        ContentModal={
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Add New Card</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name on Card"
                                    value={cardName}
                                    onChangeText={setCardName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Card Number"
                                    value={cardNumber}
                                    onChangeText={setCardNumber}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Expiry Date"
                                    value={expiryDate}
                                    onChangeText={setExpiryDate}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="CVV"
                                    value={cvv}
                                    onChangeText={setCVV}
                                />
                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity
                                        style={styles.checkbox}
                                        onPress={() => setUseDefault(!useDefault)}
                                    >
                                        {useDefault && <View style={styles.checkboxInner} />}
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxLabel}>Use as default payment method</Text>
                                </View>
                                <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
                                    <Text style={styles.addButtonLabel}>Add Card</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        onClose={() => setModalVisible(false)}
                    />

                </View>
            </ScrollView >
        </SafeAreaView >
    );
}
