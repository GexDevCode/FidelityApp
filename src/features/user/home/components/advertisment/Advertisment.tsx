import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

export function Advertisment(){
    return (
         <Image  
          height={200} 
          width={Dimensions.get('window').width}
          source={{uri: 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDCwLbmehoGG2qfYmhJ8MhUwfA0oB1q8Hchp2vzuMNA&s"
          }}
          style={styles.image}
          resizeMode="stretch"
          />
    )
}

const styles = StyleSheet.create({
  image:{
  }
})