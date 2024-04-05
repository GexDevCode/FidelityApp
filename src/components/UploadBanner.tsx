import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { AppIcon } from '../assets/icons/AppIcon';
import { Colors } from '../constants/colors';

function UploadBanner({ banner, handleChoosePhoto, defaultValue }: { banner: any, handleChoosePhoto: (type: string) => void, defaultValue?: string }) {
    return (
        <TouchableOpacity onPress={() => handleChoosePhoto("banner")}>
        {
            banner ?
            <Image source={{ uri: banner.assets[0].uri }} style={styles.image}/>
            :
            <>
                {
                    defaultValue ?
                    <Image source={{ uri: defaultValue }} style={styles.image}/>
                    :
                    <View style={styles.backgroundEmpty}>
                        <AppIcon name="gallery" iconSet="icon-app" style={styles.icon} fill={Colors.PRIMARY}/>
                    </View>
                }
            </>
        }
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: { width: "100%", height: 200, borderRadius: 15, borderColor: Colors.greyInput, borderWidth: 1 },
    backgroundEmpty: { flexDirection: "row", backgroundColor: Colors.greyInput, width: "100%", justifyContent: "center", paddingVertical: 80, borderRadius: 15 },
    icon: { width: 40, height: 40 }

})

export default UploadBanner;
