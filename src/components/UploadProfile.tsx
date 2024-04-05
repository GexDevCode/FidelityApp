import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { AppIcon } from '../assets/icons/AppIcon';
import { Colors } from '../constants/colors';

function UploadProfile({ photo, handleChoosePhoto, defaultValue }: { photo: any, handleChoosePhoto: (type: string) => void, defaultValue?: any }) {
    return (
        <TouchableOpacity onPress={() => handleChoosePhoto("photo")}>
            {
                (photo) ?
                <Image source={{ uri: (photo.assets && photo.assets[0].uri) ? photo.assets[0].uri : photo }} style={styles.image}/>
                :
                <>
                    {
                        defaultValue ?
                        <Image source={{ uri: defaultValue }} style={styles.image}/>
                        :
                        <View style={styles.backgroundEmpty}>
                            <AppIcon name="camera" iconSet="icon-app" style={styles.icon} fill={Colors.PRIMARY}/>
                        </View>
                    }
                </>

            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: { width: 80, height: 80, borderRadius: 40, borderColor: Colors.greyInput, borderWidth: 1 },
    backgroundEmpty: { flexDirection: "row", backgroundColor: Colors.greyInput, width: 80, height: 80,justifyContent: "center", borderRadius: 40, paddingTop: 24 },
    icon: { width: 30, height: 30, color: Colors.black }

})

export default UploadProfile;
