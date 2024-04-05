import { useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../../constants/colors";
import { SectionStoreItem } from "./types/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export function SectionStores(props: { id: string, title: string, stores: SectionStoreItem[]}){
    const navigation = useNavigation();
    
    const onPressItem = useCallback((item: SectionStoreItem)=>{
        navigation.navigate('StoreDetails', { storeId: item._id, title: item.storeName})
    },[])

    if(!props.stores?.length){
        return null;
    }

    return (<View key={SectionStores.name + "_Container_" + props.id}
        style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <FlatList
            key={SectionStores.name + "_FlatList_" + props.id}
            data={props.stores}
            renderItem={({ item,index }) => (
                <TouchableOpacity 
                key={SectionStores.name + `_FlatList_Item_${item._id}_${index}`} 
                activeOpacity={0.7}
                onPress={()=>onPressItem(item)}>
                    <Image 
                key={SectionStores.name + `_FlatList_Item_Image_${item._id}_${index}`} 
                source={{ uri: item.imageUrl}} 
                height={100} 
                width={120}
                style={[styles.image, index === 0? {marginLeft: 15}: undefined]}
                resizeMethod="resize"
                resizeMode="cover"
                />
                </TouchableOpacity>
            )}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.list}
            />
    </View>)
}

const styles = StyleSheet.create({
    container:{
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Colors.blackPipe,
        marginLeft: 15,
    },  
    image:{
        marginRight: 10,
        borderRadius: 20
    },
    list: {
        marginTop: 10,
        marginBottom: 15
    }
})