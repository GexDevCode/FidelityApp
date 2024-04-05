import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from "../Constants";
import React, { FormEvent } from "react";
import { Colors } from "../constants/colors";
import { AppIcon } from "../assets/icons/AppIcon";

function SubmitButton ({ title, isLoading = false, selected = false, style, styleText, onPress }: { title: string, isLoading: boolean, selected?: boolean, style?: any, styleText?: any, onPress: (e?: FormEvent<HTMLFormElement> | undefined) => void }): React.ReactElement {
    return <Pressable style={{ ...styles.button, ...style}} onPress={() => onPress()} disabled={isLoading}>
            
            {
            selected ? <AppIcon name="check" iconSet="icon-app" fill={Colors.white} style={{ width: 22, height: 22 }}/> : 

            ({ pressed }) => (
            <Text style={{...styles.text, ...styleText}}>
                {pressed ? <ActivityIndicator size="small" color={Colors.white} /> : title}
            </Text>
            )}
        </Pressable>
}

const styles = StyleSheet.create({
    container: { 
        position: "absolute", 
        maxWidth: SCREEN_WIDTH - (SAFE_AREA_PADDING.paddingLeft*4), 
        bottom: SAFE_AREA_PADDING.paddingBottom, 
        left: SAFE_AREA_PADDING.paddingLeft*2, 
        width: "100%"
    },
    button: {
        height: 45,
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

export default SubmitButton;