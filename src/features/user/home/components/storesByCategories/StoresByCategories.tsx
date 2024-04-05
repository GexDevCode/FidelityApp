import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../../constants/colors";
import { useStoreCategories } from "../../../../../hooks/user/stores/useStoreCategories";
import { StoreByCategoriesList } from "./components/storeByCategoriesList/StoreByCategoriesList";

export function StoresByCategories(){
    const { isLoading, storeCategories} = useStoreCategories() 

    if(isLoading || !storeCategories){
        return null
    }

    return (<View
        style={styles.container}>
            {
                storeCategories.map((storeCategoryItem, index)=>
                    <StoreByCategoriesList 
                        key={StoreByCategoriesList.name + "_SectionVertical_" + index}
                        id={storeCategoryItem.categoryName} 
                        title={storeCategoryItem.categoryName} 
                        stores={storeCategoryItem.stores}
                        />  
                )
            }
    </View>)
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 15,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Colors.blackPipe,
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