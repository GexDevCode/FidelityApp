import { Formik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, View, Image, TextInput, ScrollView } from 'react-native'
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from '../../../Constants';
import { InvoiceDTO } from './types/InvoiceDTO';
import StyleInput from '../../../styles/Input';
import { mixed, number, object, string } from 'yup';
import { Colors } from '../../../constants/colors';
import SubmitButton from '../../../components/SubmitButton';
import DropDownFormik from '../../../components/DropdownFormik';
import SubmitButtonAbsolute from '../../../components/SubmitButtonAbsolute';
import { useStore } from '../../../providers/Store.provider';

let invoiceSchema = object({
    typeCompany: string().required("Nessun Tipo di Società inserito"),
    vatNumber: string().required("Nessuna Partita IVA inserita"),
    taxIdCode: string().required("Nessun Codice Fiscale inserito"),
    businessName: string().required("Nessun Ragione Sociale inserito"),
    country: string().required("Nessun Paese inserito"),
    cap: number().required("Nessun Cap inserito"),
    province: string().required("Nessun Provincia inserita"),
    address: string().required("Nessun Indirizzo inserito"),
    referent: string().required("Nessun Referente inserito"),
    email: string().email().required("Nessun Email inserito"),
    phoneNumber: string().required("Nessun Numero Telefono inserito")
  });

export function Invoice({ route, navigation }: any): ReactElement {

    const { editStore } = useStore();
    useEffect(() => {
        navigation.setOptions({ title: 'Inserisci i dati della societa' })
    }, [])

    
    const onSubmit = async (values: any) => {
        try {
            console.log("submit...")
            const data = {
                ...route.params.store,
                ...values
            }

            const {
                storeName,imageUrl, bannerUrl, category, referent, address,
                typeCompany, vatNumber, taxIdCode, businessName, country,
                cap, province, email, recipientCode, pec, phoneNumber
            } = data;

            const req = {
                storeName,
                imageUrl,
                bannerUrl,
                category,
                branch: [{
                    managerName: referent,
                    location: address
                }], 
                invoiceStore: {
                    typeCompany,
                    vatNumber,
                    taxIdCode,
                    businessName,
                    country,
                    cap,
                    province,
                    address,
                    contactInfo: {
                        referent,
                        email,
                        phoneNumber,
                        recipientCode,
                        pec
                      }
                }
            }

            editStore(req);
            navigation.navigate("PackageSelection", {
                ...req
            });

        } catch (error) {
            console.log(error);
        }
    }

    const form = [
        { type: "text", label: 'Paese', value: "country", editable: true, defaultValue: "Italia" },
        { type: "dropdown", label: 'Tipo di Società', value: "typeCompany", items: [
            { label: 'Organnizzazione No Profit', value: 'NO_PROFIT_ASSOCIATION'},
            { label: 'Privato', value: 'PRIVATE' },
            { label: 'Professionale', value: 'PROFESSIONAL' },
            { label: 'Pubblica amministazione', value: 'PUBLIC_ADMINISTATION' },
            { label: 'Compania', value: 'COMPANY' },
        ] },
        { type: "text", label: 'Partita IVA', value: "vatNumber", editable: true },
        { type: "text", label: 'Codice Fiscale', value: "taxIdCode", editable: true },
        { type: "text", label: 'Ragione Sociale', value: "businessName", editable: true },
        { type: "text", label: 'Cap', value: "cap", editable: true },
        { type: "text", label: 'Provincia', value: "province", editable: true },
        { type: "text", label: 'Indirizzo', value: "address", editable: true },
        { type: "text", label: 'Referente', value: "referent", editable: true },
        { type: "text", label: 'Email', value: "email", editable: true },
        { type: "text", label: 'Numero Telefono', value: "phoneNumber", editable: true },
        { type: "text", label: 'Codice Destinatario', value: "recipientCode", editable: true },
        { type: "text", label: 'PEC', value: "pec", editable: true },
    ]

    return (
        <View>
                <Formik
                    initialValues={{
                        typeCompany: '',
                        vatNumber: '',
                        taxIdCode: '',
                        businessName: '',
                        country: 'Italy',
                        cap: null,
                        province: '',
                        address: '',
                        referent: '',
                        email: '',
                        phoneNumber: '',
                        recipientCode: null,
                        pec: ''
                    }}
                    validationSchema={invoiceSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
                                {
                                    form.map((v) => {
                                        switch (v.type) {
                                            case "text":
                                                const _value = v.defaultValue ? v.defaultValue : v.value;
                                                return (
                                                    <TextInput
                                                    onChangeText={handleChange(_value)}
                                                    onBlur={handleBlur(_value)}
                                                    value={(values as any)[_value]}
                                                    placeholder={v.label}
                                                    autoCapitalize="none" 
                                                    autoCorrect={false}
                                                    style={{ 
                                                        ...StyleInput.input, 
                                                        borderWidth: 1, 
                                                        borderColor: ((errors as any)[_value] && (touched as any)[_value]) ? Colors.redDarky : '#ECECEC' 
                                                    }}
                                                    editable={v.editable}
                                                />
                                                )
                                            case "dropdown":
                                                return (
                                                    <DropDownFormik
                                                        zIndex={3000}
                                                        name={v.value}
                                                        placeholder={v.label}
                                                        items={v.items}
                                                        style={{ 
                                                            ...StyleInput.input,
                                                            borderWidth: 1, 
                                                            borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : '#ECECEC' 
                                                        }}
                                                    />
                                                );
                                            default:
                                                break;
                                        }
                                    })
                                }
                                    <View style={{ height: 200 }} />
                            </ScrollView>
                                                          <SubmitButtonAbsolute 
                                                          title={"Seleziona"} 
                                                          isLoading={false} 
                                                          onPress={handleSubmit}
                                                          styleContainer={{
                                                              backgroundColor: Colors.white,
                                                              bottom: 0,
                                                              left: 0,
                                                              maxWidth: SCREEN_WIDTH,
                                                              paddingTop: 10,
                                                              paddingBottom: 10,
                                                              paddingLeft: SAFE_AREA_PADDING.paddingLeft*2,
                                                              paddingRight: SAFE_AREA_PADDING.paddingLeft*2
                                                          }} />
                                                          </>
                    )}
                </Formik>
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