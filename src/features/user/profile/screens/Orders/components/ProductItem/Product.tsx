import { Image, StyleSheet, Text, View } from "react-native";
import { ProductItem } from "./types";
import { Colors } from "../../../../../../../constants/colors";

export function Product(props: ProductItem){
    return <View style={styles.container}>
        <Image source={{uri: props.imageUrl}} height={60} width={60} style={styles.image}/>
        <View style={styles.columnInfo}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.greyLight,
        marginBottom: 10,
        backgroundColor: Colors.white,
        padding:10,
        flexDirection:"row",
        flex:1
    },
    image:{
        borderRadius: 10,
        marginRight:10
    },
    columnInfo:{
        flexDirection:'column',
        flex:1
    },
    columnCta:{
        justifyContent:"flex-end"
    },
    buttonCta:{
        backgroundColor: Colors.cyanDeepAqua,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal:8
    },
    textCta:{
        fontSize : 14,
        color: Colors.white
    },
    title: {
        fontSize : 15,
        color: Colors.blackPipe,
    },
    description: {
        fontSize : 12,
        color: Colors.redDarky,
    }
})