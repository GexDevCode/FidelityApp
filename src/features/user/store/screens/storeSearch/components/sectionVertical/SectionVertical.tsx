import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RenderItem } from "../renderItem/RenderItem";
import { Item } from "./types/itemVertical";
import { useNavigation } from "@react-navigation/native";
import { StoreCategoryByNameModel } from "../../../../../../../hooks/user/stores/useStoreAllByCategoryName";

export function SectionVertical(props: { id: string, stores: StoreCategoryByNameModel[]}){
    const rootKey = SectionVertical.name+ "_Container_" + props.id;
    const navigation = useNavigation();

    const onPressItem = useCallback((item: Item)=>{
        navigation.navigate("StoreDetails", { storeId : item.id})
    },[])


    return (
        <View key={rootKey+"_Container"}
            style={styles.container}>
            <FlatList
                key={SectionVertical.name+ "_FlatList_" + props.id}
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
        padding: 10
    },
    list: {
        marginTop: 10,
        marginBottom: 15
    }
})
