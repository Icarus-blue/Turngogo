import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import themeContext from "../theme/themeContex";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from 'react-native-paper';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Yourwallet({ route, navigation }) {
  const theme = useContext(themeContext);
  const [tokenNum, setTokenNum] = useState();
  const [Bill, setBill] = useState('');
  const [isshow, setIsshow] = useState(false)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsshow(true);
    setBill((Number(tokenNum) / 30).toFixed(2));
  }, [tokenNum])

  useEffect(() => {
    setIsshow(false);
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F6f6" }}>
      <AppBar
        color={theme.bg}
        title="My Wallet"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#F7F6f6", marginTop: 20 }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: "#F7F6f6" }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={style.viewstyle}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={style.welcometxt}>Your coins</Text>
              <View style={[style.row, { flex: 1, flexDirection: "row", marginTop: 20 }]}>
                <View style={{ flex: 2, justifyContent: "center", flexDirection: "column" }}>
                  <Image source={require('../../assets/image/gymflexlogo.png')} style={{
                    width: 70, height: 70
                  }} />
                </View>
                <View style={{ flex: 3, justifyContent: "flex-start", flexDirection: 'row' }}>
                  <Text style={style.text1}>32 </Text>
                  <Text style={[style.text2, { marginTop: 5 }]}>Tokens left</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <View style={[style.row, { flex: 1, flexDirection: "column", marginTop: 0 }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={style.firsttxt}>Recent activity</Text>
                  <Text style={style.secondtxt}>Show all</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Added 12 tokens</Text>
                  <Text style={style.secondtxt}>7 minutes ago</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Used 13 token at Hufit</Text>
                  <Text style={style.secondtxt}>Yesterday</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Added 12 tokens</Text>
                  <Text style={style.secondtxt}>7 minutes ago</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Scanned 13 token at Hufit</Text>
                  <Text style={style.secondtxt}>Yesterday</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <View style={[style.row, { flex: 1, flexDirection: "column", marginTop: 0 }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={style.firsttxt}>Purchage Tokens</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 30, justifyContent: "space-between" }}>
                  <Icon name="remove-outline" size={40} style={{ marginTop: 10 }}></Icon>
                  <TextInput
                    placeholder="1000"
                    onChangeText={e => setTokenNum(e)}
                    style={{
                      borderWidth: 2,
                      height: 50,
                      marginTop: 10,
                      width: 100,
                      fontSize: 30,
                      padding: 5
                    }} />
                  <Icon name="add-outline" size={40} style={{ marginTop: 10 }}></Icon>
                  <Image source={require('../../assets/image/gymflexlogo.png')} style={{
                    width: 70, height: 70
                  }} />
                </View>
                {isshow && (
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>$ {Bill}</Text>
                )}
                <View style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    style={[
                      style.btn2,
                    ]}
                    onPress={() => setVisible(true)}
                  >
                    <Text style={[style.btntxt1, { color: "white" }]}>
                      Buy Tokens
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal transparent={true} visible={visible}>
                  <View
                    style={{
                      flex: 1,
                      width: width,
                      backgroundColor: "#000000aa",
                    }}
                  >
                    <View
                      style={[
                        style.modalcontainer,
                        {
                          backgroundColor: theme.bg,
                          width: width - 30,
                          marginVertical: 170,
                        },
                      ]}
                    >
                      <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ paddingTop: 10, alignSelf: "center" }}>
                          <Avatar.Icon
                            icon="help"
                            color="#FF4747"
                            size={80}
                            style={{
                              borderWidth: 5,
                              borderColor: "#FF4747",
                              backgroundColor: theme.bg,
                            }}
                          />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                          <Text
                            style={[
                              style.subtitle,
                              { color: theme.txt, textAlign: "center" },
                            ]}
                          >
                            Are You Sure?
                          </Text>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                          <Text
                            style={[
                              style.subtxt,
                              { color: Colors.disable, textAlign: "center" },
                            ]}
                          >
                            You need to pay through Paypal or Paystack 
                          </Text>
                          <Text
                            style={[
                              style.subtxt,
                              { color: Colors.disable, textAlign: "center" },
                            ]}
                          >
                            Will you buy tokens ?
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setVisible(false);
                            }}
                            style={{
                              paddingHorizontal: 30,
                              paddingVertical: 12,
                              borderColor: "#FF4747",
                              borderWidth: 1,
                              borderRadius: 20,
                              backgroundColor: theme.bg,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: "#FF4747",
                                fontFamily: "Plus Jakarta Sans",
                              }}
                            >
                              Paypal
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setVisible(false);
                            }}
                            style={{
                              paddingHorizontal: 30,
                              paddingVertical: 12,
                              borderColor: "green",
                              borderWidth: 1,
                              borderRadius: 20,
                              backgroundColor: theme.bg,
                              marginLeft: 10
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: "green",
                                fontFamily: "Plus Jakarta Sans",
                              }}
                            >
                              Paystack 
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 35,
                              paddingVertical: 12,
                              backgroundColor: Colors.primary,
                              borderRadius: 20,
                              marginLeft: 10,
                            }}
                            onPress={() => setVisible(false)}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: theme.bg,
                                fontFamily: "Plus Jakarta Sans",
                              }}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </Card.Content>
          </Card>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
