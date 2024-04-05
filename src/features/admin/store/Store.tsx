import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loader from '../../../views/Loader';
import { useStore } from '../../../providers/Store.provider';
import { AppIcon } from '../../../assets/icons/AppIcon';
import { Colors } from '../../../constants/colors';
import { RewardCard } from '../components/RewardCard';
import { useAuth } from '../../../hooks/useAuth';
import Title from '../../../components/Title';
import SubmitButton from '../../../components/SubmitButton';
import { SAFE_AREA_PADDING } from '../../../Constants';

function Option({ title, navigation, onPress }: { title: string, navigation: string, onPress: (route: string) => void }): React.ReactElement {

  return (
    <TouchableWithoutFeedback onPress={() => onPress(navigation)}>
      <View style={{ backgroundColor: Colors.white, paddingVertical: 18,  paddingHorizontal: 15, flexDirection: "row", width: "100%", borderRadius: 10, justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
        <View style={{ width: 16, height: 16, marginTop: 3 }}>
          <AppIcon name="arrowRight" iconSet="icon-app" fill={Colors.black} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export function Store({ navigation }: any): React.ReactElement {

  const [,auth,,,logout] = useAuth();
  const { store, selectedStore } = useStore();
  const [storeRewardCard, setStoreRewardCard] = useState<any>()

  const options = [
    {
      title: "Modifica store",
      route: "EditStore"
    },
    /*
    {
        title: "Gestione branch",
        route: "ManageBranch"
    },
    */
    {
        title: "Gestione sconti",
        route: "ManageDiscount"
    },
    {
        title: "Contatta supporto",
        route: "CustomerSupport"
    },
    {
        title: "Sottoscrizione",
        route: "PackageSelection",
        params: {
          subscriptionId: store.subscriptionId
        }
    }
  ]

  useEffect(() => {
    updateRewardCard()
  }, [store, selectedStore])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateRewardCard()
    });

    return unsubscribe;
}, [navigation, store, selectedStore]);

  const updateRewardCard = () => {
    if(store && selectedStore) {
      setStoreRewardCard({
        authType: "STORE",
        imageUrl: store.imageUrl,
        storeName: store.storeName,
        managerName: selectedStore.managerName,
        branch: [{ location: (store.invoiceStore as any).address }],
        colorReward: Colors.PRIMARY
      })
    }
  }

  const onNavigate = (route: string, params: any) => {
    navigation.push(route, params)
  }

  if(!store && selectedStore && !storeRewardCard) return <Loader />

  if(!store.isActive) {
    return (
      <View style={{ height: "100%", backgroundColor: Colors.white, flexDirection: "column", justifyContent: "center", paddingHorizontal: SAFE_AREA_PADDING.paddingLeft }}>
        <Text style={{ color: Colors.black, textAlign: "center", marginBottom: 20, fontSize: 22, fontWeight: "500"}}>Attiva la reward card</Text>
        <Text style={{ color: Colors.black, textAlign: "center", marginBottom: 40, fontSize: 16, fontWeight: "400"}}>Comincia a creare la tua reward card personalizzata. I tuoi clienti ti stanno aspettando</Text>
        <SubmitButton 
          title='Attiva'
          isLoading={false}
          onPress={() => store.invoiceStore ? navigation.push("PackageSelection", store) : navigation.push("EditFidalityCard")}
        />
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {
          storeRewardCard ?
          <View style={{ width: "100%" }}>
            <RewardCard store={storeRewardCard} />
          </View>
          : null
        }

        {
          options.map((option: any) => <Option {...option} onPress={() => onNavigate(option.route, option.params)} />)
        }

        <Option title='Logout' navigation={"LoginStore"} onPress={(route: string) => {
            logout()
        }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 30, 
    paddingHorizontal: 10,
    backgroundColor: Colors.greyLight 
  },  
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: '80%',
  }
})