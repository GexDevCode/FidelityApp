import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import React, { FormEvent, useEffect, useState } from "react";
import { SAFE_AREA_PADDING } from "../../../Constants";
import { Colors } from "../../../constants/colors";

function DeleteModal ({ visible, onPress }: { visible: boolean, onPress: () => void }): React.ReactElement {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Elimina</Text>
          <Text style={styles.modalText}>Sei sicuro di voler eliminare il dato</Text>
          <Pressable style={styles.button} onPress={onPress}>
              <Text style={styles.text}>
                  Elimina
              </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
      width: "100%",
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
        fontSize: 24,
        fontWeight: "700"
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

export default DeleteModal;