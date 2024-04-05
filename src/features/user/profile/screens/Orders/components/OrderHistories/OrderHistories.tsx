import { FlatList } from "react-native-gesture-handler";
import { Product } from "../ProductItem/Product";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import React from "react";
import { useDiscountsClaimed } from "../../../../../../../hooks/user/discounts/useDiscountsClaimed";

export function OrderHistories(){
    const { discountClaimed } = useDiscountsClaimed();

     const onPressItem = (productId: string)=>{
        Alert.alert('a' + productId)
    };

    if(!discountClaimed?.length){
         return <Text style={styles.title}>Al momento non hai ottenuto nessuna offerta</Text>
    }

    return (<View>
        <FlatList
            key={OrderHistories.name + "_FlatList_"}
            data={discountClaimed}
            ListHeaderComponent={  <Text style={styles.title}>Offerte che hai ottenuto</Text>}
            renderItem={({ item,index }) => 
                    <Product
                        key={OrderHistories.name + "_FlatList_Item_" + index + '_'+item._id}
                        id={item._id}
                        imageUrl={item.imageUrl}
                        title={item.name}
                        description={`${item.points} points`}
                        onPress={()=>onPressItem(item._id)}/>
                }
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            />
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