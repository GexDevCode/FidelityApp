import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import React, { FormEvent, useEffect, useState } from "react";
import { SAFE_AREA_PADDING } from "../../../Constants";
import { Colors } from "../../../constants/colors";

function ActivationModal ({ visible, onPress }: { visible: boolean, onPress: () => void }): React.ReactElement {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Benvenuto</Text>
          <Text style={styles.modalText}>Comincia a creare la tua fidelity card. I tuoi clienti ti stanno aspettando</Text>
          <Pressable style={styles.button} onPress={onPress}>
              <Text style={styles.text}>
                  Attiva
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
        marginTop: 22,
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2,
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
        backgroundColor: Colors.PRIMARY,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: Colors.white,
    },
})

export default ActivationModal;