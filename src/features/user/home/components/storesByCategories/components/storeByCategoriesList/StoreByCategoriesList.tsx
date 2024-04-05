import { useCallback } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import { ItemVertical } from "./types/itemVertical";
import { RenderItem } from "../renderItem/RenderItem";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StoreCategoryByNameModel } from "../../../../../../../hooks/user/stores/useStoreAllByCategoryName";

export function StoreByCategoriesList(props: { id: string, title: string, stores: StoreCategoryByNameModel[]}){
    const rootKey = StoreByCategoriesList.name+ "_Container_" + props.id;
    const navigation = useNavigation();
        
    const onPressItem = useCallback((item: ItemVertical)=>{
        navigation.navigate("StoreDetails", { storeId : item.id, title: item.title})
    },[])

    const onPressAll = useCallback(()=>{
        navigation.navigate('Stores', { categoryId: props.id})
    },[])

    

    return (
        <View key={rootKey+"_Container"}
            style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>onPressAll()}>
                    <Text style={styles.seeAll}>Tutti</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                key={StoreByCategoriesList.name+ "_FlatList_" + props.id}
                data={props.stores}
                renderItem={({ item,index }) => 
                    <RenderItem 
                        item={{
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.name,
                            description: ''
                        }} 
                        index={index} 
                        rootKey={rootKey} 
                        onPressItem={onPressItem}/>
                }
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                style={styles.list}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    header:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Colors.blackPipe,
    },  
    seeAll: {
        fontSize: 14,
        color: Colors.cyanDeepAqua,
        marginTop: 5
    },
    list: {
        marginTop: 10,
        marginBottom: 15
    }
})
