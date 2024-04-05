import { StyleSheet, Text, View } from "react-native";
import Title from "./Title";
import { Colors } from "../constants/colors";
import { useEffect } from "react";

type Confermation = { 
    title: string, 
    description: string, 
    navigation: () => void 
}

export function ConfermationScreen({ title, description, navigation }: Confermation) {

    useEffect(() => {
        navigation()
    }, [])
    
    return(
        <View style={styles.container}>
            <Title text={title} style={styles.title} />
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30, 
        textAlign: "center",
        backgroundColor: Colors.PRIMARY,
        height: "100%",
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        color: Colors.black,
        textAlign: "center"
    },
    description: {
        fontSize: 19,
        fontWeight: "400",
        color: Colors.black,
        textAlign: "center"
      }
})