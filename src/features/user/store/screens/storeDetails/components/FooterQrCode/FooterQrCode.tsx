import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../../../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import React from "react";

function SubmitButton ({onPress}: {onPress: () => void}): React.ReactElement {
    const navigation = useNavigation();

    

    return <View style={styles.container}>
        <Text style={styles.textInfo}>Guadagna punti facendo scannerizzare la tua fidelity card alla cassa!</Text>
        <TouchableOpacity style={styles.button} onPress={() => onPress()} activeOpacity={0.9}>
            <Text style={styles.textButton}>Mostra QR code</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: { 
        bottom: 0,
        position: "absolute", 
        height: 130,
        width: "100%",
        backgroundColor: Colors.white,
        justifyContent:"center",
        paddingHorizontal: 20,
        paddingVertical:20,
        borderTopWidth: 0.5,
        borderTopColor: Colors.greyLight

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: Colors.greenMint,
    },
    textInfo: {
      fontSize: 13,
      lineHeight: 21,
      fontWeight: '500',
      letterSpacing: 0.25,
      color: Colors.blackPipe,
      marginBottom:10,
      textAlign:"center"
    },
    textButton: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: Colors.white,
    },
})

export default SubmitButton;