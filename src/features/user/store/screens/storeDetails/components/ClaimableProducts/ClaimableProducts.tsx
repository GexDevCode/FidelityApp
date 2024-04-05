import { FlatList } from "react-native-gesture-handler";
import { Product } from "../ProductItem/Product";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import { useState } from "react";
import { DiscountResult } from "../../../../../../../hooks/user/discounts/useDiscounts";
import { QrModal as QrModalProduct } from "../QrModal/QrModal";
import { CodeScannerDiscount } from "../../../../../../../types/CodeScanner";

export interface ClaimableProductsProps {
    idUserRewardCard: string,
    discountsClaimable: DiscountResult[] | undefined, 
    onPressReedem: (productId: string)=> void
}

export interface QrCodeProduct {
    isVisible: boolean;
    idDiscount: string | null;
    additionalInfo?: string | null; 
}
export function ClaimableProducts({discountsClaimable, idUserRewardCard}: ClaimableProductsProps){
    const [ isModalQRCodeStoreVisible, setQRCodeModalVisible ] = useState<QrCodeProduct>({isVisible: false, idDiscount: null, additionalInfo: null});
    if(!discountsClaimable){
        return null;
    }

    const onHide = () => {
        setQRCodeModalVisible({ isVisible: false, idDiscount: null, additionalInfo: null});
    }

    const onPressReedem = (item: DiscountResult) => {
        setQRCodeModalVisible({ isVisible: true, idDiscount: item._id, additionalInfo: `Prodotto: ${item.name}`});
    }
    
    return (<View>
        <QrModalProduct isVisible={isModalQRCodeStoreVisible.isVisible} onHide={onHide} qrCodeContent={JSON.stringify({
                idDiscount: isModalQRCodeStoreVisible.idDiscount,
                idUserRewardCard: idUserRewardCard,
                type: "DISCOUNT",
            } as CodeScannerDiscount)} additionalInfo={isModalQRCodeStoreVisible.additionalInfo as any}/>
        <Text style={styles.title}>Puoi sbloccare ora!</Text>
        {
            discountsClaimable?.length ? <FlatList
            key={ClaimableProducts.name + "_FlatList_"}
            data={discountsClaimable}
            renderItem={({ item,index }) => 
                    <Product
                        key={ClaimableProducts.name + "_FlatList_Item_" + index + '_'+item._id}
                        id={item._id}
                        imageUrl={item.imageUrl}
                        title={item.name}
                        description={`${item.points} points`}
                        canClaim={true}
                        onPress={()=>onPressReedem(item)}/>
                }
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            />
            : <Text>Non disponibile</Text>
        }
        </View>)
}

const styles = StyleSheet.create({
    title: {
        color: Colors.blackPipe,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    }
})