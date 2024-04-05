import React from 'react'
import { StyleSheet, View, Text, Alert, Image, Linking } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loader from '../../../../../views/Loader';
import { Colors } from '../../../../../constants/colors';
import { useUser } from '../../../../../hooks/user/users/useUser';
import { AppIcon } from '../../../../../assets/icons/AppIcon';

const options = [
  {
      title: "Il mio storico",
      route: "Orders"
  }, 
  {
      title: "Contatta supporto",
      email: 'info@gmail.com',
  }
]

function Option({ title, navigation, onPress }: { title: string, navigation: string, onPress: (route: string) => {} }): React.ReactElement {

  return (
    <TouchableWithoutFeedback onPress={() => onPress(navigation)}>
      <View style={{ backgroundColor: "white", paddingVertical: 18,  paddingHorizontal: 15, flexDirection: "row", width: "100%", borderRadius: 10, justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.blackPipe, }}>{title}</Text>
        <AppIcon name="arrowRight" iconSet="icon-app" color={Colors.black} width={10}/>
      </View>
    </TouchableWithoutFeedback>
  );
}
export function Profile({ navigation }: any): React.ReactElement {

  const { user } = useUser();

  const onNavigate = (route: string) => {
    navigation.push(route)
  }

  if(!user) return <Loader />

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50, paddingHorizontal: 10 }}>
        <Text style={styles.title}>{user.name}</Text>
        {
          options.map((option: any) => <Option {...option} onPress={() => {
            if(option.route){
                return onNavigate(option.route)
            } 
            if(option.email){
                Linking.openURL('mailto:fidelity.support@gmail.com')
            }

        }} />)
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },  
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: '80%',
    color: Colors.blackPipe
  }
})