import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const QRCodeScanner = () => {
    const onSuccess = () => {

    };
    console.log("hello world")
    const [barcodes, setBarcodes] = useState([])

    const barcodeRecognized = ({ barcodes }) => {
        setBarcodes({ barcodes })
        barcodes.forEach(barcode => console.warn(barcode.data))
    };

    const renderBarcodes = () => {
        return (
            <View>
                {barcodes[0]}
            </View>
        )
    }
    return (
        <>
            <View >
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                    onGoogleVisionBarcodesDetected={barcodeRecognized}
                >
                    {renderBarcodes()}
                </RNCamera>
            </View>
        </>
    )
}

export default QRCodeScanner;