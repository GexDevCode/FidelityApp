import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../hooks/user/users/useUser";
import { Colors } from "../constants/colors";

export const HomeNavigator = () => {
  const {user} = useUser();
  
  if(!user){
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labelInfo}>Welcome to Fidelity!</Text>
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    backgroundColor: Colors.white, 
    paddingHorizontal: 13, 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.greyLight, 
    elevation: 5
  },
  labelInfo: {
    color: Colors.greenMint, 
    fontSize: 15, 
    fontWeight: '400'
  },
  name: { 
    color: Colors.blackPipe, 
    fontSize: 18, 
    fontWeight: '900' 
  }
})