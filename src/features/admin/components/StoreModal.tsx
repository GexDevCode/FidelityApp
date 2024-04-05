import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react";
import { SAFE_AREA_PADDING } from "../../../Constants";
import { Colors } from "../../../constants/colors";
import { useStore } from "../../../providers/Store.provider";
import Loader from "../../../views/Loader";
import { AppIcon } from "../../../assets/icons/AppIcon";
import { ScrollView } from "react-native-gesture-handler";

function StoreModal ({ visible, onPress, onPressOut }: { visible: boolean, onPress: (data: any, index: number) => void, onPressOut: () => void }): React.ReactElement {
    
  const { store, selectedStore, getStore } = useStore();

  useEffect(() => {
    getStore()
  }, [])
  
  if(!store || !selectedStore) return <></>

  return <></>;
  return <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressOut}
    >
     <Pressable style={styles.centeredView} onPressOut={onPressOut}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalView}>

            <Text>Store</Text>
            <Pressable key={"STORE_ADMIN"} onPress={onPress}>
              <View style={{ flexDirection: "row", paddingVertical: 20, justifyContent: "space-between"  }}>
              <View style={{ flexDirection: "row"}}>
                <AppIcon name="location" iconSet="icon-app" style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={{ color: Colors.black, fontSize: 16 }}>{store.location}</Text>
                </View>
                {selectedStore.isAdmin ? <AppIcon name="check" iconSet="icon-app" style={{ width: 20, height: 20 }}/> : null }
              </View>
            </Pressable>
            { store && store.branch.length > 1 ? <Text>Branches</Text> : null}
            {
              store && store.branch.map((branch: any, index: number) => (
                <View key={"STORE_" + branch._id}>
                  {
                    branch._id ?
                    <Pressable 
                     onPress={() => onPress(branch, index)}>
                      <View style={{ flexDirection: "row", paddingVertical: 20, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row"}}>
                          <AppIcon name="location" iconSet="icon-app" style={{ width: 20, height: 20, marginRight: 10 }} />
                          <Text style={{ color: Colors.black, fontSize: 16 }}>{branch.location}</Text>
                        </View>
                        {branch._id === selectedStore._id ? <AppIcon name="check" iconSet="icon-app" style={{ width: 20, height: 20 }}/> : null }
                      </View>
                    </Pressable>
                    : null
                  }
                </View>

              ))
            }
          </ScrollView>
      </Pressable >
    </Modal>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        width: "100%",
        maxHeight: 300,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 19,
        fontWeight: "500"
      },
      modalText: {
        fontSize: 20,
        fontWeight: "300",
        marginTop: 10,
        textAlign: 'center',
      },
      button: {
        width: "100%",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: Colors.redDarky,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
})


export default StoreModal;