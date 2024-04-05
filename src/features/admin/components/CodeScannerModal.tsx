import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useEffect, useState } from "react";
import { SAFE_AREA_PADDING } from "../../../Constants";
import { Colors } from "../../../constants/colors";

export type CodeScanner = {
  type: 'DISCOUNT' | 'REWARD_CARD' | 'USER',
  idUser?: string
  idUserRewardCard?: string,
  points?: string
  idDiscount?: string
}
/*
{
  type: 'REWARD_CARD',
  id: "6609593a95551d3fbcfe31fe",
}
*/

function CodeScannerModal ({ data, visible, onPress, onDismiss }: { data: CodeScanner, visible: boolean, onPress: (data: CodeScanner) => void, onDismiss: () => void }): React.ReactElement {

    const [points, setPoints] = useState<string | undefined>()
    

    useEffect(() => {
      setPoints(undefined);
    }, [visible])

    const onChange = (points: string) => {
      setPoints(points)
    }

    if(data) {
      return <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onDismiss={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {
            data.type == 'USER' ?
            <>
              <Text style={styles.modalTitle}>Assegna punti</Text>
              <Text style={styles.modalText}>Quanti punti vuoi assegnare?</Text>
              <TextInput
                  onChangeText={(v) => onChange(v)}
                  value={points}
                  autoCapitalize="none" 
                  autoCorrect={false}
                  style={{ 
                      borderWidth: 0,
                      height: 120,
                      fontSize: 48,
                      color: Colors.PRIMARY
                  }}
                  autoFocus={true}
                  keyboardType="numeric"
              />
              <Pressable style={styles.button} onPress={() => { data.points = points; onPress(data) }}>
                  <Text style={styles.text}>
                      Assegna
                  </Text>
              </Pressable>
              <Pressable onPress={onDismiss}>
                <Text style={{ fontSize: 16, color: Colors.redDarky, marginTop: 20 }}>Chiudi</Text>
              </Pressable>
              
            </>
            : null
          }
          {
            data.type == 'REWARD_CARD' ?
            <>
              <Text style={styles.modalTitle}>Assegna punti</Text>
              <Text style={styles.modalText}>Quanti punti vuoi assegnare?</Text>
              <TextInput
                  onChangeText={(v) => onChange(v)}
                  value={points}
                  autoCapitalize="none" 
                  autoCorrect={false}
                  style={{ 
                      borderWidth: 0,
                      height: 120,
                      fontSize: 48,
                      color: Colors.PRIMARY
                  }}
                  autoFocus={true}
                  keyboardType="numeric"
              />
              <Pressable style={styles.button} onPress={() => { data.points = points; onPress(data) }}>
                  <Text style={styles.text}>
                      Assegna
                  </Text>
              </Pressable>
              <Pressable onPress={onDismiss}>
                <Text style={{ fontSize: 16, color: Colors.redDarky, marginTop: 20 }}>Chiudi</Text>
              </Pressable>
              
            </>
            : null
          }
          {
            data.type == 'DISCOUNT' ?
            <>
              <Text style={styles.modalTitle}>Discount</Text>
              <Text style={styles.modalText}>L 'utente ha richiesto il discount. Vuoi accetterlo?</Text>
              <Pressable style={styles.button} onPress={() => onPress(data)}>
                  <Text style={styles.text}>
                      Accetta
                  </Text>
              </Pressable>
              <Pressable onPress={onDismiss}>
                <Text style={{ fontSize: 16, color: Colors.redDarky, marginTop: 20 }}>Chiudi</Text>
              </Pressable>
            </>
            : null
          }
        </View>
      </View>
    </Modal>
    }

    return <></>

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
        fontSize: 22,
        fontWeight: "700"
      },
      modalText: {
        fontSize: 16,
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

export default CodeScannerModal;