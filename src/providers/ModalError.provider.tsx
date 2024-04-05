import React, { createContext, useContext, useState } from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { SAFE_AREA_PADDING } from '../Constants';

export const ModalErrorContext = createContext({
    error: {
        title: "",
        message: "",
    },
    showError: ({ title, message }: { title: string, message: string }) => {},
    visible: false
});

export function ModalError({ title, message, show, onPress }: {title: string, message: string, show: boolean, onPress: () => void }): React.ReactElement {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={onPress}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalText}>{message}</Text>
                  <Button color={Colors.redDarky} title={"Close"} onPress={onPress} />
              </View>
            </View>

        </Modal>

    )
}
const ModalErrorProvider = ({ children }: any): any => {
    const [error, setError] = useState<any>({
        title: "",
        message: ""
    });
    const [visible, setVisible] = useState<boolean>(false);

    const showError = async ({ title, message }: { title: string, message: string }) => {
        setError({ title, message })
        setVisible(true);
    }

    return (
        <ModalErrorContext.Provider value={{ error, showError, visible }}>
            <ModalError title={error.title} message={error.message} show={visible} onPress={() => setVisible(false)} />
            {children}
        </ModalErrorContext.Provider>
    );
}

const useModalError = () => useContext(ModalErrorContext);

export { ModalErrorProvider, useModalError };

const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2,
    },
    modalView: {
      margin: 20,
      backgroundColor: Colors.white,
      borderRadius: 20,
      padding: 35,
      alignSelf: "center",
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: "column"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: Colors.PRIMARY,
    },
    buttonClose: {
      backgroundColor: Colors.redDarky,
    },
    textStyle: {
      color: Colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalTitle: {
      marginBottom: 5,
      fontSize: 19,
      fontWeight: "bold",
      color: Colors.black,
      textAlign: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      color: Colors.black,
      textAlign: 'center',
    },
  });