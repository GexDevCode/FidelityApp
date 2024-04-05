import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { QrModalProps } from "./types";
import { Colors } from "../../../../../../../constants/colors";
import QRCode from 'react-native-qrcode-svg';
import { AppIcon } from "../../../../../../../assets/icons/AppIcon";


export function QrModal(props: QrModalProps){
    const { isVisible, additionalInfo, onHide} = props;

    return <Modal 
        visible={isVisible}
        transparent={true}>
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable onPress={onHide}>
                            <AppIcon iconSet="icon-app" name="x" width={20} height={20} color={Colors.blackPipe}/>
                        </Pressable>
                    </View>
                    <View style={styles.containerQR}>
                        <QRCode
                            value={props.qrCodeContent}
                            size={140}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.labelInfo}>Mostra questo QR code alla cassa</Text>
                        {
                             additionalInfo ?<Text style={styles.labelAdditionalInfo}>{additionalInfo}</Text> : null
                        }
                    </View>
                </View>
            </View>
    </Modal>
}

const styles = StyleSheet.create({
    root:{
        alignSelf:'center',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:"center",
        width: Dimensions.get('window').width,
    },
    container: {
        minHeight: '49%',
        minWidth: '80%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: Colors.greyLight,
    },
    header: {
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    containerQR:{
        flex: 1,
        alignSelf:'center',
        backgroundColor:Colors.white
    },
    labelUsername:{
        marginTop:10,
        marginLeft: 30,
        color: Colors.blackPipe,
        fontWeight: 'bold',
    },
    labelAdditionalInfo:{
        marginTop:5,
        color: Colors.blackPipe,
    },
    labelInfo:{
        color: Colors.blackPipe,
        fontWeight: 'bold',
    },
    footer:{
        marginHorizontal: 30,
        marginBottom: 15
    }
})