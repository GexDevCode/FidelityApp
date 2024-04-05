import React from 'react';
import { Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export function CustomToast(toast: any){
    return (
        <View style={{padding: 15, backgroundColor: Colors.white, borderRadius: 10, borderWidth: 0.5 , borderColor: Colors.grey}}>
            <Text>{toast?.toast?.message}</Text>
        </View>
    );
}
