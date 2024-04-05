import React, { useEffect } from 'react'
import { useDiscount } from "../hooks/useDiscount";
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../../../views/Loader';
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from '../../../../Constants';
import SubmitButtonAbsolute from '../../../../components/SubmitButtonAbsolute';
import { Discount } from '../../components/Discount';
import { AppIcon } from '../../../../assets/icons/AppIcon';

export function ManageDiscount({ navigation, route }: any): React.ReactElement {

    const [discounts, getDiscounts] = useDiscount();

    useEffect(() => {
        navigation.setOptions({ title: 'Gestione Discount' });
        getDiscounts()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDiscounts()
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        console.log("route", route)
    }, route)

    const onSubmit = (discount: any) => {
        navigation.push("DetailDiscount", { discount })
    }
    
    if(!discounts) return <Loader />
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    discounts.map((v: any) => (
                    <TouchableOpacity onPress={() => onSubmit(v)}>
                        <View style={{ marginTop: 20 }}>
                            <Discount {...v}>
                                <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                                    <View style={{ width: 16, height: 16 }}>
                                        <AppIcon name="arrowRight" iconSet="icon-app" color={Colors.black} />
                                    </View>
                                </View>
                            </Discount>
                        </View>
                    </TouchableOpacity>

                    ))
                }
                <View style={{ height: 200 }} />
            </ScrollView>
            <SubmitButtonAbsolute 
                    title={"Crea discount"} 
                    isLoading={false} 
                    onPress={() => {
                        navigation.push("CreateDiscount")
                    }}
                    styleContainer={{
                        backgroundColor: Colors.greyLight,
                        bottom: 0,
                        left: 0,
                        maxWidth: SCREEN_WIDTH,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: SAFE_AREA_PADDING.paddingLeft,
                        paddingRight: SAFE_AREA_PADDING.paddingLeft
                    }} 
                />
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30, 
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
        backgroundColor: Colors.greyLight 
    },
    containerBranch: {
        flexDirection: "row",
        justifyContent: "space-between", 
        backgroundColor: Colors.white, 
        paddingTop: 20, 
        paddingLeft: 10, 
        paddingBottom: 20, 
        paddingRight: 10, 
        borderRadius: 10 
    },
    description: {
        fontSize: 19,
        fontWeight: 'bold',
        backgroundColor: Colors.greyLight,
        color: Colors.black,
        textAlign: "center"
      }
})