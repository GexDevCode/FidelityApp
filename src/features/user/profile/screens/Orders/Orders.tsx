import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../../../../constants/colors';
import { OrderHistories } from './components/OrderHistories/OrderHistories';



export function Orders({ navigation }: any): React.ReactElement {
  return (
    <View style={styles.container}>
        <OrderHistories/>
        <View style={{height: 100}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whitePaper,
    paddingHorizontal: 20
  },  
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: '80%',
    color: Colors.blackPipe
  }
})