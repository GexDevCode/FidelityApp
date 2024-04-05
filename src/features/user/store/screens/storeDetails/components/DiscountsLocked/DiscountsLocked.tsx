import { FlatList } from "react-native-gesture-handler";
import { Product } from "../ProductItem/Product";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import React from "react";
import { DiscountResult } from "../../../../../../../hooks/user/discounts/useDiscounts";

export interface DiscountsLockedProps { 
    discountsLocked : DiscountResult[] | undefined
}

export function DiscountsLocked({ discountsLocked }: DiscountsLockedProps){
    
    if(!discountsLocked){
        return null;
    }

    return (<View style={{paddingBottom:20}}>
        <Text style={styles.title}>Premi da sbloccare!</Text>
        {
            discountsLocked?.length ? 
            <FlatList
            key={DiscountsLocked.name + "_FlatList_"}
            data={discountsLocked}
            renderItem={({ item,index }) => 
                    <Product
                        key={DiscountsLocked.name + "_FlatList_Item_" + index + '_'+item._id}
                        id={item._id}
                        imageUrl={item.imageUrl}
                        title={item.name}
                        description={`${item.points} points`}
                        canClaim={false}/>
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