import { StyleSheet, View } from "react-native";
import { SectionStores } from "./SectionStores";
import { useStoresForYou } from "../../../../../hooks/user/stores/useStoresForYou";

export function ForYou(){
    const { storesForYou } = useStoresForYou();

    if(!storesForYou){
        return null;
    }

    return (<View style={styles.container}>
        <SectionStores id="forYou" title={'For you'} stores={storesForYou}/>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        
    }
})