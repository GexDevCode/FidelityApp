import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../../../assets/icons/AppIcon";
import { Colors } from "../../../constants/colors";
import { SAFE_AREA_PADDING } from "../../../Constants";
import StoreModal from "./StoreModal";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../../providers/Store.provider";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({children, tintColor} : { children: string; tintColor?: string | undefined; }) {
    const { selectedStore, selectStore, getStore } = useStore();
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    useMemo(() => {
        getStore()
    }, [])
    
    const onSwitchStore = (data: any, index: number) => {
        selectStore(data._id);
        setOpenModal(false)
    } 

    if(!selectedStore) return <></>

    return (
    <>
        <View style={{...styles.container}}>
            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/logo/Flogo_plain.png")} style={styles.logo}/>
                <Text style={{ color: Colors.white, fontWeight: "600" }}>Fidelity</Text>
            </View>
            {
                /*
                (selectedStore && selectedStore.location) ?
                <TouchableOpacity onPress={() => {
                    setOpenModal(true)
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.white, marginRight: 10  }}>{selectedStore.location}</Text>
                        <AppIcon name="arrowDown" iconSet="icon-app" style={{ width: 20, height: 20, marginTop: 2 }} />
                    </View>
                </TouchableOpacity>
                : null
                */
            }
        </View>
        <StoreModal visible={openModal} onPress={onSwitchStore} onPressOut={() => setOpenModal(false)}/>
    </>

    );
  }

  const styles = StyleSheet.create({
    container: { 
        width: "100%", 
        flexDirection: "column", 
        justifyContent: "space-between",
        paddingVertical: 5,
        height: 30, 
        backgroundColor: Colors.PRIMARY,
        paddingRight: SAFE_AREA_PADDING.paddingRight*2 
    },
    logo: { width: 20, height: 20, marginRight: 10 }
  })