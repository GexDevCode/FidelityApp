import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Advertisment } from '../components/advertisment/Advertisment'
import { ForYou } from '../components/sectionStores/ForYou'
import { StoresByCategories } from '../components/storesByCategories/StoresByCategories'
import { Colors } from '../../../../constants/colors'

export function UserPage() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ForYou/>
        <Advertisment/>
        <StoresByCategories /> 
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10
  },
  headerContainer: {
  },
})