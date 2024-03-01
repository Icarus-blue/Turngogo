
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import style from "../theme/style";
import theme from "../theme/theme";
import { api } from '../api';
import { showToast } from '../components/ShowToast';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { GET_WALLET_AMOUNT } from '../redux/actionTypes';

const App = () => {
  
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const [amount, setAmount] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const numberRegex = /^-?\d*\.?\d+$/;

  const deposite = async () => {
    try {
      const res = await api.deposite({ amount: amount });
      dispatch({ type: GET_WALLET_AMOUNT, payload: res.data.wallet.amount })
      if (res.data.status) {
        showToast('success', 'Deposite success', res.data.message);
        navigation.navigate('Homepage')
      } else {
        showToast('error', 'Deposit failure', 'Network Issue now, Try again later!')
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      alert('PAYMENT MADE SUCCESSFULLY!');
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar
        color={theme.bg}
        title="Link your payment "
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#FFFFFF", marginTop: 20 }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
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
      <View style={styles.container}>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>deposite amount : (---) USD</Text>
        <View style={{
          borderWidth: 1, width: "70%", marginBottom: 10
          , borderRadius: 10, paddingLeft: 15
        }}>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={(e) => {
              setAmount(e);
              setIsError(false)
            }}
          />
        </View>
        {isError && (<>
          <Text style={{
            color: "red", fontSize: 12,
            marginBottom: 20
          }}>{errorMessage}</Text>
        </>)}
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (amount) {
                setShowGateway(true);
                deposite(amount);
              } else {
                setIsError(true);
                setErrorMessage('You must input deposite amount now!')
              }
            }}>
            <Text style={styles.btnTxt}>Pay Using PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {showGateway && !isError ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={"fade"}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => {
                  setShowGateway(false);
                }}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            {!isError && (
              <>
                <WebView
                  source={{ uri: 'https://sandbox.paypal.com/login' }}
                  style={{ flex: 1 }}
                  onMessage={onMessage}
                  onLoadStart={() => {
                    setProg(true);
                    setProgClr('red');
                  }}
                  onLoadProgress={() => {
                    setProg(true);
                    setProgClr('green');
                  }}
                  onLoadEnd={() => {
                    setProg(false);
                  }}
                  onLoad={() => {
                    setProg(false);
                  }}
                />
              </>
            )}
          </View>
        </Modal>
      ) : null} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '50%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
    borderRadius: 15
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default App;