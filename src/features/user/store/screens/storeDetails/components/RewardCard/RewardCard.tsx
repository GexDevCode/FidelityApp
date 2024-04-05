import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import QRCode from 'react-native-qrcode-svg';
import { QrModal } from "../QrModal/QrModal";
import { useMemo, useState } from "react";
import { StoreDetails } from "../../../../../../../hooks/user/stores/useStoreDetails";
import { RewardCardPutResult } from "../../../../../../../hooks/user/rewardCards/useRewardCards";
import { CodeScannerUser } from "../../../../../../../types/CodeScanner";

export interface RewardCardProps {
    storeDetails: StoreDetails;
    rewardCard: RewardCardPutResult;
}

export function RewardCard(props: RewardCardProps){ 
    const store = props.storeDetails;
    const rewardCard = props.rewardCard;
    const [isModalVisible, setModalVisible] = useState(false);
    const address = useMemo(()=>{
        if(store.branch.length > 1){
            return null   
        }
        return store.branch[0]?.location;
    },[store.branch, store._id]);


    const onPressQRCode = () => {
        setModalVisible(true);
    }
    const onCloseModal = () => {
        setModalVisible(false);
    }

    if(!rewardCard){
        return null;
    }

    return <View style={styles.container}>
        <QrModal 
            isVisible={isModalVisible} 
            onHide={onCloseModal}  
            qrCodeContent={JSON.stringify({
                idUser: rewardCard.idUser,
                type: "USER",
            } as CodeScannerUser)}/>
        <View>
            <View style={styles.containerStore}>
                <Image 
                source={{uri: store.imageUrl}} 
                height={20} 
                width={20} 
                style={styles.image}/>
                <Text style={styles.storeTitle}>{store.storeName}</Text>
            </View>
            <View>
                <Text style={styles.points}>{rewardCard.points}</Text>
                <Text style={styles.pointsInfo}>Punti disponibili</Text>
                <Text style={styles.holderName}>{store.storeName}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
        </View>
        <View style={styles.columnRight}>
            <View style={styles.qrColumn}>
                <View style={styles.qrCodeContainer}>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPressQRCode}>
                        <QRCode
                            value={JSON.stringify({
                                idUser: rewardCard.idUser,
                                type: "USER",
                            } as CodeScannerUser)}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
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
        height: 180
    },
    infoColumn: {
        flexDirection:"column",
    },
    storeTitle:{
        color: Colors.white,
        fontSize: 16,
        fontWeight:'300',
    },
    containerStore:{
        flexDirection:"row",
        alignItems:"center"
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
        fontWeight:'bold',
        marginTop:30
    },
    address: {
        color: Colors.white,
        fontSize: 16,
        fontWeight:'300',
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    columnRight:{
        flexDirection:"row",
        borderLeftColor: Colors.white,
        borderLeftWidth: 1,
        paddingLeft:10,
        paddingTop:3
    },
    qrColumn:{
        backgroundColor: Colors.PRIMARY,
    },
    qrCodeContainer:{
        backgroundColor: Colors.white,
        padding: 5,
        borderRadius: 2
    }
})