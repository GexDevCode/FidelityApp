import { StyleSheet, TouchableOpacity } from "react-native";
import { ItemVertical } from "../storeByCategoriesList/types/itemVertical";
import { Image, Text, View } from "react-native";
import { Colors } from "../../../../../../../constants/colors";
import React from "react";

export type RenderItemProps = { 
    item: ItemVertical, 
    index: number,
    rootKey: string, 
    onPressItem: (item: ItemVertical)=> void
}

export function RenderItem(props: RenderItemProps){
    const { item, index, rootKey, onPressItem } = props;

    return <TouchableOpacity
            key={rootKey+`_${item.id}_${index}_touchable`} 
            activeOpacity={0.7}
            onPress={()=>onPressItem(item)}>
                <View style={stylesItem.container}>
                    <Image 
                    source={{ uri: item.imageUrl}} 
                    height={60} 
                    width={60}
                    style={stylesItem.image}
                    resizeMethod="resize"
                    resizeMode="cover"
                    />
                    <View style={stylesItem.column}>
                        <Text style={stylesItem.title}>{item.title}</Text>
                        <Text style={stylesItem.title}>{item.description}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
}


const stylesItem = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginBottom:10
    },
    column:{
         flexDirection: 'column',
         flex:1,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Colors.blackPipe,
    },  
    image:{
        marginRight: 10,
        borderRadius: 20
    },
    description: {
        fontSize: 12,
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Colors.blackPipe,
    },  
})