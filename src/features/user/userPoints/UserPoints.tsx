import { StyleSheet, Text, View } from "react-native"
import QRCode from 'react-native-qrcode-svg';
import { useUser } from "../../../hooks/user/users/useUser";
import { Colors } from "../../../constants/colors";
import { CodeScannerUser } from "../../../types/CodeScanner";

export function UserPoints(){
    const { user } = useUser();
    
    if(!user){
        return null;
    }

    return (<View style={styles.container}>
            <QRCode
                value={JSON.stringify({
                                idUser: user._id,
                                type: "USER",
                            } as CodeScannerUser)}
                size={140}
                />
            <Text style={styles.description}>Mostra questo QR Code alla cassa</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description:{
        marginTop: 12,
        fontSize:14,
        fontWeight:'bold',
        color: Colors.blackPipe
    }
})