
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { StyleSheet, View,Pressable, Text } from 'react-native'
import { SAFE_AREA_PADDING } from '../../../Constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { object, string } from 'yup';
import { Colors } from '../../../constants/colors';
import { RewardCard } from '../../user/store/screens/storeDetails/components/RewardCard/RewardCard';
import { CustomerSupportDTO } from './types/CustomerSupportDTO';
import CustomForm, { CustomFormType } from '../../../components/CustomForm';
import { useEmail } from '../../../hooks/useEmail';

let editSchema = object({
    message: string().required("Nessun messaggio inserito")
  });

export function CustomerSupport({ navigation }: any): ReactElement {

    const [sendEmail] = useEmail()
    useEffect(() => {
        navigation.setOptions({ title: 'Contatta Supporto' })
    }, [])


    const onSubmit = (values: CustomerSupportDTO) => {
        console.log(values)
        sendEmail(values)
    }

    const form: Array<CustomFormType> = [
        { type: "textarea", label: 'Messaggio', value: "message", editable: true },
    ]


    return (
        <View style={{ height: "100%", backgroundColor: Colors.greyLight }}>
                <CustomForm
                    description={"Descrivi il problema che hai riscontrato o informazioni in più che vuoi sapere"}
                    form={form} 
                    initialValues={{
                        message: ''
                    }}
                    validationSchema={editSchema}
                    submitButtonTitle={"Invia"} 
                    onSubmit={onSubmit}
                />
        </View>

    )
}

const styles = StyleSheet.create({
    formContainer: {
        paddingTop: 50, 
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2,
        backgroundColor: Colors.white 
    }
})