import React, { useEffect } from 'react'
import { object, string } from 'yup';
import { useBranch } from "../hooks/useBranch";
import { StyleSheet, Text, View } from 'react-native';
import Title from '../../../../components/Title';
import moment from 'moment';
import { Colors } from '../../../../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../../../views/Loader';
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from '../../../../Constants';
import { AppIcon } from '../../../../assets/icons/AppIcon';
import SubmitButtonAbsolute from '../../../../components/SubmitButtonAbsolute';

export function ManageBranch({ navigation }: any): React.ReactElement {

    const [branches, getBranches ] = useBranch();

    useEffect(() => {
        navigation.setOptions({ title: 'Gestione Branch' });
        getBranches()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getBranches()
        });
    
        return unsubscribe;
    }, [navigation]);

    const onSubmit = (branch: any) => {
        navigation.push("DetailBranch", { branch })
    }
    
    if(!branches) return <Loader />
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    branches.map((v: any) => (
                    <TouchableOpacity onPress={() => onSubmit(v)}>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.containerBranch}>
                                <View style={{ marginLeft: 10, minWidth: 250 }}>
                                    <Title text={v.managerName} style={{ color: Colors.black }}/>
                                    <Text style={{ color: Colors.black }}>Creato il: {moment(v.timespampCreated).format("MMM DD")}</Text>
                                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 600 }}>{v.location}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', justifyContent: "center" }}>
                                    <View style={{ width: 16, height: 16 }}>
                                        <AppIcon name="arrowRight" iconSet="icon-app" color={Colors.black} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    ))
                }
                <View style={{ height: 200 }} />
            </ScrollView>
            <SubmitButtonAbsolute 
                    title={"Crea branch"} 
                    isLoading={false} 
                    onPress={() => {
                        navigation.push("CreateBranch")
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
        paddingVertical: 20, 
        paddingHorizontal: 10,
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