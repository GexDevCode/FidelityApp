import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CodeScannerPage } from './src/features/admin/codescanner/CodeScanner';
import { AdminPage } from './src/features/admin/analytics/screens/Analytics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Store } from './src/features/admin/store/Store';
import { UserPage } from './src/features/user/home/screens/Home';
import { RoutesAdmin, RoutesAuth, RoutesUser } from './src/Routes';
import { EditStorePage } from './src/features/admin/editstore/EditStore';
import { CreateBranch } from './src/features/admin/branch/screens/CreateBranch';
import { EditFidalityCardPage } from './src/features/admin/editfidalitycard/EditFidalityCard';
import { Stores } from './src/features/user/store/screens/storeSearch/Stores';
import { StoreDetails } from './src/features/user/store/screens/storeDetails/StoreDetails';
import { Profile } from './src/features/user/profile/screens/Profile/Profile';
import { Orders } from './src/features/user/profile/screens/Orders/Orders';
import SplashScreen from 'react-native-splash-screen';
import { HomeNavigator } from './src/navigators/HomeNavigator';
import { TabSetType } from './src/assets/icons/tabs';
import { useAuth } from './src/hooks/useAuth';
import { WelcomePage } from './src/features/auth/WelcomePage';
import { TabBarUser } from './src/components/TabBarUser';
import { TabBarAdmin } from './src/components/TabBarAdmin';
import { LoginUser } from './src/features/auth/user/LoginUser';
import ErrorBoundary from 'react-native-error-boundary';
import { RegisterUser } from './src/features/auth/user/RegisterUser';
import { RegisterStore } from './src/features/auth/admin/RegisterStore';
import { LoginStore } from './src/features/auth/admin/LoginStore';
import { StoreProvider } from './src/providers/Store.provider';
import { PackageSelection } from './src/features/admin/packageselection/PackageSelection';
import { Invoice } from './src/features/admin/invoice/Invoice';
import { ManageBranch } from './src/features/admin/branch/screens/ManageBranch';
import { DetailBranch } from './src/features/admin/branch/screens/DetailBranch';
import { ManageDiscount } from './src/features/admin/discount/screens/ManageDiscount';
import { CreateDiscount } from './src/features/admin/discount/screens/CreateDiscount';
import { DetailDiscount } from './src/features/admin/discount/screens/DetailDiscount';
import { CustomerSupport } from './src/features/admin/customersupport/CustomerSupport';
import Header from './src/features/admin/components/Header';
import { Colors } from './src/constants/colors';
import { UserPoints } from './src/features/user/userPoints/UserPoints';
import { RegisterVerificationUser } from './src/features/auth/user/RegisterVerificationUser';
import { RegisterVerificationStore } from './src/features/auth/admin/RegisterVerificationStore';
import { ModalError, ModalErrorProvider } from './src/providers/ModalError.provider';
import Loader from './src/views/Loader';
import { ToastProvider } from 'react-native-toast-notifications'
import { CustomToast } from './src/components/CustomToast';

const Stack = createNativeStackNavigator()
const StackAuth = createNativeStackNavigator<RoutesAuth>()
const StackAdmin = createNativeStackNavigator<RoutesAdmin>()
const StackUser = createNativeStackNavigator<RoutesUser>()

const Tab = createBottomTabNavigator();
export const UserTabNavigator = {
  home : {
    name : 'Ristoranti',
    icon: 'home' as TabSetType,
  },
  receivePoints :{
    name : 'Ricevi punti',
    icon: 'rewardCard' as TabSetType,
  },
  profile : {
    name: 'Profilo',
    icon: 'profile' as TabSetType
  },
}

export const AdminTabNavigator = {
  admin : {
    name : 'Admin',
    icon: 'home' as TabSetType,
  },
  codeScanner :{
    name : 'Code Scanner',
    icon: 'rewardCard' as TabSetType,
  },
  store : {
    name: 'Store',
    icon: 'store' as TabSetType
  },
}


function User() {
  return (
    <Tab.Navigator tabBar={props => <TabBarUser {...props} />}>
      <Tab.Screen 
        name={UserTabNavigator.home.name} 
        component={UserPage} 
        options={{
          header: ()=> <HomeNavigator/>
        }}
        />
      <Tab.Screen 
        name={UserTabNavigator.receivePoints.name} 
        component={UserPoints} 
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: "Ricevi punti",
        }}/>
      <Tab.Screen name={UserTabNavigator.profile.name} component={Profile} />
    </Tab.Navigator>
  );
}

const hideScreens = ["Code Scanner"];
function Admin() {
  return (
    <Tab.Navigator tabBar={props => {
        const isHidden = props.state.routes.find((route: any, index: number) => {
          const hide = (props.state.index === index) && hideScreens.includes(route.name)
          return hide ? route : null
        })
        if (isHidden) return null
        return <TabBarAdmin {...props} />
    } } screenOptions={({ route }) => ({
      tabBarHideOnKeyboard: route.name === "Code Scanner" ? true : false    
    })}>
      <Tab.Screen name={AdminTabNavigator.admin.name}  component={AdminPage} options={{ headerShown: false }}/>
      <Tab.Screen name={AdminTabNavigator.codeScanner.name}  component={CodeScannerPage} options={{ headerShown: false }} />
      <Tab.Screen name={AdminTabNavigator.store.name}  component={Store} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {

  const [,auth] = useAuth();
  
  useEffect(() => {
    SplashScreen.hide();
  }, [auth])

  const errorHandler = (error: Error, stackTrace: string) => {
    /* Log the error to an error reporting service */

    console.log("error", error, stackTrace);
  }

  const initialRouteName = !auth ? "Welcome" : auth.authType === "USER" ? "Home" : "Analytics";

  console.log("START SCREEN", initialRouteName);
  console.log("AUTH", auth);

  let showInitNavigator = <></>
  if(!auth) {
    showInitNavigator =
      <StackAuth.Group>
        <StackAuth.Screen name="Welcome" component={WelcomePage} />
        <StackAuth.Screen name="LoginUser" component={LoginUser} />
        <StackAuth.Screen name="RegisterUser" component={RegisterUser} />
        <StackAuth.Screen name="RegisterVerificationUser" component={RegisterVerificationUser} />

        <StackAuth.Screen name="LoginStore" component={LoginStore} />
        <StackAuth.Screen name="RegisterStore" component={RegisterStore} />
        <StackAuth.Screen name="RegisterVerificationStore" component={RegisterVerificationStore} />
      </StackAuth.Group>
  }

  const optionHeaderBack: any = { headerShown: true, headerStyle: {
    backgroundColor: Colors.PRIMARY,
    
  }, headerTitleStyle: { color: Colors.white }, headerTitleAlign: "center", headerTintColor: Colors.white }

  console.log(process.env);
  return (
    <ErrorBoundary onError={errorHandler}>
      <ModalErrorProvider>
      <StripeProvider 
        publishableKey="pk_test_51P12ee07UUu9VDOgsWsuYnfRnmOVTOAiPu6re7abmyBzZJA9NyFJf1q2fQBL6wRQTIkRPuaJw8CqwyRoTlZKMbmY00qfUexk89"
        merchantIdentifier="merchant.com.rewardapp"
      >
          <ToastProvider 
          placement='top'
          offset={50}
          offsetTop={30}
          offsetBottom={40}
          renderType={{
          rewardCard: (toast: any) => (
            <CustomToast toast={toast}/>
          )
        }}>
        <StoreProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={styles.root}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  statusBarStyle: 'dark',
                  animationTypeForReplace: 'push',
                }}
                initialRouteName={initialRouteName}
                >
                      {showInitNavigator}
                      <StackAdmin.Group>
                        <StackAdmin.Screen 
                          name="Analytics" 
                          component={Admin} 
                          options={{ 
                            headerShown: true, 
                            headerTitle: (props) => <Header {...props} />,
                            headerStyle: {
                              backgroundColor: Colors.PRIMARY,
                            }, 
                          }}
                        />
                        <StackAdmin.Screen name="CodeScanner" component={CodeScannerPage} options={{ headerShown: false }}/>
                        <StackAdmin.Screen name="Store" component={Store} />
                        <StackAdmin.Screen name="EditStore" component={EditStorePage} options={{ headerShown: true }}/>
                        <StackAdmin.Screen name="ManageBranch" component={ManageBranch} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="CreateBranch" component={CreateBranch} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="DetailBranch" component={DetailBranch} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="ManageDiscount" component={ManageDiscount} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="CreateDiscount" component={CreateDiscount} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="DetailDiscount" component={DetailDiscount} options={{ headerShown: true }} />
                        <StackAdmin.Screen name="CustomerSupport" component={CustomerSupport} options={{ headerShown: true }} />

                        <StackAdmin.Screen 
                          name="EditFidalityCard" 
                          component={EditFidalityCardPage}
                          options={{ headerShown: true }}
                        />
                        <StackAdmin.Screen 
                          name="PackageSelection" 
                          component={PackageSelection}
                          options={{ headerShown: true }}
                        />
                        <StackAdmin.Screen 
                          name="Invoice" 
                          component={Invoice}
                          options={{ headerShown: true }}
                        />
                        
                      </StackAdmin.Group>

                      <StackUser.Group>
                        <StackUser.Screen 
                          name="Home" 
                          component={User} 
                        />
                        <StackUser.Screen 
                          name="Stores" 
                          component={Stores} 
                          options={({ route }) => ({
                            headerTitleAlign: 'center',
                            headerShown: true,
                            title: (route.params as any).title 
                          })}
                        />
                        <StackUser.Screen 
                          name="StoreDetails" 
                          component={StoreDetails} 
                          options={({ route }) => ({
                            headerTitleAlign: 'center',
                            headerShown: true,
                            title: (route.params as any).title 
                          })}
                        />
                        <StackUser.Screen 
                          name="Profile" 
                          component={Profile} 
                          options={{ headerShown: true }}
                        />
                        <StackUser.Screen 
                          name="Orders" 
                          component={Orders} 
                          // options={{ headerShown: false }}
                        />
                      </StackUser.Group>
              </Stack.Navigator>
            </GestureHandlerRootView>
          </NavigationContainer>
        </StoreProvider>
      </ToastProvider>
      </StripeProvider>
      </ModalErrorProvider>
    </ErrorBoundary>

  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default App;
