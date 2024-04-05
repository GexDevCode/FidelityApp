
import { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, View,  ScrollView, Text } from 'react-native'
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from '../../../Constants';
import { Colors } from '../../../constants/colors';
import SubmitButtonAbsolute from '../../../components/SubmitButtonAbsolute';
import { AppIcon } from '../../../assets/icons/AppIcon';
import { useStore } from '../../../providers/Store.provider';
import { usePackage } from './hooks/usePackage';
import Loader from '../../../views/Loader';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useStripeAPI } from '../../../hooks/useStripe';
import { ConfermationScreen } from '../../../components/ConfermationScreen';
import SubmitButton from '../../../components/SubmitButton';

export type Package = {
    selected: boolean
    title: string
    description: string
    price: string
    recurring: string
    features_active: Array<{id: string, name: string }>
    onPress: () => void
}

function Package({ selected, title, description, price, recurring, features_active, onPress }: Package): ReactElement {
    return(<View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{price}</Text>
        <Text style={styles.text}>{recurring}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ borderTopWidth: 1, marginTop: 20 }} />
        {
            features_active.map((v) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{ fontSize: 16, marginTop: 10, marginRight: 50 }}>{v.name}</Text>
                <AppIcon name="check" iconSet="icon-app" style={{ width: 20, height: 20, marginTop: 10 }} fill={Colors.PRIMARY}/> 
            </View>
            ))
        }
        <View style={{ marginTop: 20 }}>
            <SubmitButton 
                title="Scegli"
                isLoading={false}
                selected={selected}
                onPress={onPress}
            />
        </View>
           
    </View>)
    
}
export function PackageSelection({ route, navigation }: any): ReactElement {

    const {subscriptionId} = route.params

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { paymentSheet, cancelSubscription} = useStripeAPI();

    const { activeStore } = useStore();
    const { packages, packageSelected, getPackages, getPackageSeleted } = usePackage();

    const [selectedPackage, setPackage] = useState<any>();
    
    const [confirmationScreen, setConfirmationScreen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({ title: subscriptionId ? "Sottoscrizione" : 'Seleziona pacchetto' })
        getPackages()
        subscriptionId ? getPackageSeleted() : null
    }, [])

    useEffect(() => {
        setPackage(packageSelected);
    }, [packageSelected])

    const fetchPaymentSheetParams = async () => {
        const response = await paymentSheet({...route.params, packageId: selectedPackage.id })
        const { subscriptionId, clientSecret, publishableKey } = await response.data.data;
        return {
          subscriptionId,
          clientSecret,
          publishableKey,
        };
      };
    
    const initializePaymentSheet = async () => {
      
        console.log("Init Stripe...", selectedPackage)
        if(selectedPackage) {
            setIsLoading(true);
            const {
                subscriptionId,
                clientSecret,
            } = await fetchPaymentSheetParams();
        
            const { error } = await initPaymentSheet({
              merchantDisplayName: route.params.invoiceStore.businessName,
              paymentIntentClientSecret: clientSecret,
              // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
              //methods that complete payment after a delay, like SEPA Debit and Sofort.
              allowsDelayedPaymentMethods: true,
              defaultBillingDetails: {
                name: 'Jane Doe',
              }
            });
            if (!error) {
              const {error} = await presentPaymentSheet();
    
                  if (error) {
                    if (error.code === PaymentSheetError.Failed) {
                      // Handle failed
                      console.log("STRIPE ERROR", error)
                    } else if (error.code === PaymentSheetError.Canceled) {
                      // Handle canceled
                      console.log("STRIPE ERROR", error)
                    }
                    setIsLoading(false);
                  } else {
                    // Payment succeeded
                    console.log("STRIPE SUCCESS")
                    activeStore({
                        ...route.params,
                        packageId: selectedPackage.id,
                        subscriptionId
                    })
                    setConfirmationScreen(true);
                    setIsLoading(false);
                  }
            }
        }
  
    };


    if(!packages) return <Loader />

    if(confirmationScreen) {
        return <ConfermationScreen 
            title="Congratulazioni!"
            description="hai attivato con successo la tua reward card"
            navigation={() => {
                setTimeout(() => {
                    setConfirmationScreen(false);
                    navigation.navigate("Admin");
                }, 3000)
                
            }}
        />
    }

    if(!packages) return <Loader />

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2 }}>
                    {
                        packages.map((_package: any) => {
                            if(_package.is_active) {
                                return (<Package {..._package} selected={selectedPackage ? _package.id === selectedPackage.id : false} onPress={() => setPackage(_package)}/>)
                            }

                            return <></>
                        })
                    }
                    <View style={{ height: 200 }} />
            </ScrollView>
            <SubmitButtonAbsolute 
                        title={subscriptionId ? "Cancella" : "Paga"} 
                        isLoading={isLoading}
                        onPress={subscriptionId ? cancelSubscription : initializePaymentSheet}
                        styleContainer={{
                            backgroundColor: Colors.white,
                            bottom: 0,
                            left: 0,
                            maxWidth: SCREEN_WIDTH,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: SAFE_AREA_PADDING.paddingLeft*2,
                            paddingRight: SAFE_AREA_PADDING.paddingLeft*2
                        }}
                        styleButton={{
                            backgroundColor: subscriptionId ? Colors.redDarky : Colors.PRIMARY
                        }} 
                    />
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: "100%",
        paddingVertical: 50, 
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2,
        backgroundColor: Colors.white,
        alignSelf: "center",
        borderRadius: 15,
        marginTop: 50 
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        color: Colors.PRIMARY
    },
    subtitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        color: Colors.black
    },
    description: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 20,
        color: Colors.PRIMARY
    },
    text: {
        fontSize: 19,
        textAlign: "center"
    }
})