import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = (first, second, third) => {
    Toast.show({
        type: first,
        text1: second,
        text2: third,
        duration: 2000,
    });
};