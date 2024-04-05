import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useMemo, useState } from "react";
import { Colors } from "../../../constants/colors";

export function RewardCard({ store, values }: { store?: any, values?: any }){ 
    const rewardCard =  { points: 100 }

    if(!rewardCard || !store){
        return null;
    }

    return <View style={{...styles.container }}>
        <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
            <View style={styles.containerStore}>
                <Image 
                source={{ uri: store.imageUrl }} 
                height={50} 
                width={50} 
                style={styles.image}/>
                <Text style={styles.storeTitle}>{store.storeName}</Text>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "space-between", minHeight: 50 }}>
                {store.managerName ? <Text style={styles.holderName}>Manager: {store.managerName}</Text> : <View style={{ marginTop: 40 }}/>}
                <Text style={styles.address}>{store.branch[0].location}</Text>
            </View>

        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 230
    },
    infoColumn: {
        flexDirection:"column",
    },
    storeTitle:{
        color: Colors.white,
        fontSize: 16,
        fontWeight:'300',
        marginTop: 12
    },
    containerStore:{
        flexDirection:"row"
    },
    image:{
        borderRadius: 40,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Colors.greyLight
    },
    points: {
        color: Colors.white,
        fontSize: 35,
        fontWeight:'bold',
        marginTop: 5
    },
    pointsInfo: {
        color: Colors.white,
        fontSize: 12,
        fontWeight:'300',
        marginTop: -5
    },
    holderName: {
        color: Colors.white,
        fontSize: 17,
        fontWeight:'bold'
    },
    address: {
        color: Colors.white,
        fontSize: 16,
        fontWeight:'300',
        position: "absolute",
        bottom: 0,
        left: 0,
        alignSelf: "flex-start"
    },
    columnRight:{
        flexDirection:"row",
        borderLeftColor: Colors.white,
        borderLeftWidth: 1,
        paddingLeft:10,
        paddingTop:3
    },
    qrColumn:{
        backgroundColor: Colors.white,
    },
    qrCodeContainer:{
        backgroundColor: "transparent",
        padding: 5
    }
})