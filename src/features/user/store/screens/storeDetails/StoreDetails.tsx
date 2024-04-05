import { ScrollView, StyleSheet, View } from "react-native";
import SubmitButton from "./components/FooterQrCode/FooterQrCode";
import { ClaimableProducts } from "./components/ClaimableProducts/ClaimableProducts";
import { DiscountsLocked } from "./components/DiscountsLocked/DiscountsLocked";
import { Colors } from "../../../../../constants/colors";
import { RewardCard } from "./components/RewardCard/RewardCard";
import { QrModal as QRModalStore } from "./components/QrModal/QrModal";
import { useState } from "react";
import { useStoreDetails } from "../../../../../hooks/user/stores/useStoreDetails";
import { useRewardCards } from "../../../../../hooks/user/rewardCards/useRewardCards";
import { useDiscounts } from "../../../../../hooks/user/discounts/useDiscounts";
import { CodeScannerUser } from "../../../../../types/CodeScanner";



export function StoreDetails({route}: any){
    const { store } = useStoreDetails(route.params.storeId);
    const { rewardCard } = useRewardCards(store?._id);
    const { discountsClaimable, discountsLocked } = useDiscounts(store?._id);
    const [ isModalQRCodeStoreVisible, setQRCodeModalVisible ] = useState(false);


    const onPressQRCode = () => {
        setQRCodeModalVisible(true);
    }
    const onCloseModal = () => {
        setQRCodeModalVisible(false);
    }

    if(!store || !rewardCard){
        return null;
    }
   
    return <View>
        <QRModalStore isVisible={isModalQRCodeStoreVisible} onHide={onCloseModal} qrCodeContent={JSON.stringify({
                idUser: rewardCard.idUser,
                type: "USER",
            } as CodeScannerUser)}/>
        <ScrollView style={styles.scrollView}>
            <View style={styles.containerReward}>
                <RewardCard storeDetails={store} rewardCard={rewardCard}/>
            </View>
            <View style={styles.containerItems}>
                <ClaimableProducts idUserRewardCard={rewardCard._id} discountsClaimable={discountsClaimable} onPressReedem={onPressQRCode}/>
                <DiscountsLocked discountsLocked={discountsLocked}/>            
            </View>
            <View style={styles.extraView}/>
        </ScrollView>
        <SubmitButton onPress={onPressQRCode}/>
    </View>;
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.whitePaper,
        paddingTop: 25
    },
    extraView:{
        height: 250
    },
    containerItems: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        borderTopColor: Colors.greyLight,
        borderTopWidth: 1,
        marginTop: 20
    },
    containerReward: {
         paddingHorizontal: 15,
    }
})