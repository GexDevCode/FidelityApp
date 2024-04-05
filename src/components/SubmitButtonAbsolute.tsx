import { Pressable, StyleSheet, Text, View } from "react-native"
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from "../Constants";
import React, { FormEvent } from "react";
import SubmitButton from "./SubmitButton";

function SubmitButtonAbsolute ({ title, isLoading = false, styleContainer, styleButton, onPress }: { title: string, isLoading: boolean, styleContainer?: any, styleButton?: any, onPress: (e?: FormEvent<HTMLFormElement> | undefined) => void }): React.ReactElement {
    return <View style={{...styles.container, ...styleContainer}}>
        <SubmitButton title={title} isLoading={isLoading} onPress={onPress} style={styleButton}/>
    </View>
}

const styles = StyleSheet.create({
    container: { 
        position: "absolute", 
        maxWidth: SCREEN_WIDTH - (SAFE_AREA_PADDING.paddingLeft*4), 
        bottom: SAFE_AREA_PADDING.paddingBottom, 
        left: SAFE_AREA_PADDING.paddingLeft*2, 
        width: "100%"
    }
})

export default SubmitButtonAbsolute;