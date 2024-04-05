import React from 'react'
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image } from 'react-native'
import { SAFE_AREA_PADDING } from '../../Constants'
import { Colors } from '../../constants/colors'
import SubmitButton from '../../components/SubmitButton'

export function WelcomePage({ navigation }: any): React.ReactElement {

  return (
    <View style={styles.container}>
        <Image 
          source={require("../../assets/logo/flogo_colored.png")} 
          style={{width: 100, height: 100, alignSelf: "center", marginTop: "40%"}}
        />

        <View style={{ marginTop: 100 }}>
          <SubmitButton title={"Login"} isLoading={false} onPress={() => navigation.push("LoginUser")} />
        </View>
        
        <TouchableOpacity onPress={() => navigation.push("LoginStore")}>
          <Text style={styles.text}>Sei un business?</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: "20%",
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: Colors.PRIMARY,
      marginTop: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.PRIMARY,
    textAlign: "center",
    marginTop: 20
  },
})