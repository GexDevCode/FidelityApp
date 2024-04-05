import React, { useState, useRef } from 'react'
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import { Colors } from '../../../constants/colors'
import { SAFE_AREA_PADDING } from '../../../Constants'
import { Formik } from 'formik'
import StyleInput from '../../../styles/Input'
import { useAuth } from '../../../hooks/useAuth'
import {  object, string } from 'yup'
import SubmitButton from '../../../components/SubmitButton'
import Title from '../../../components/Title'
import { AppIcon } from '../../../assets/icons/AppIcon'

let loginSchema = object({
    name: string().required('Nessun nome inserito'),
    surname: string().required('Nessun cognome inserito'),
    email: string().email().required('Nessun Email inserito'),
    password: string().required('No password provided.'),
    confirmPassword: string().required().test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
    }),
    //.min(8, 'Password is too short - should be 8 chars minimum.')
    //.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

export function RegisterUser({ navigation }: any): React.ReactElement {
    const refFormik = useRef(null);
    const [error,auth,, register] = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSubmit = async (values: any) => {
        setIsLoading(true);

        const isSuccess = await register({
            authType: "USER",
            data: {
                user: {
                    typeSign: "EMAIL",
                    ...values,
                    timestampPrivacyAccepted: new Date,
                    timestampTermConditionAccepted: new Date
                }
            }
        })
        if(isSuccess){
          navigation.navigate("RegisterVerificationUser", { formRegistration: (refFormik.current as any)?.values })
        } 

        setIsLoading((prev) => !prev);
    }


  return (
    <ScrollView style={styles.container}>
        {error}
        <Pressable style={{...styles.button, width: 10, paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
            <AppIcon iconSet='navigators-header-icons' name={'back'} width={15} height={15} color={Colors.white} />
        </Pressable>
        <Title text='Comincia a raccogliere punti in tutti i tuoi negozi preferiti' style={{ textAlign: "center", marginTop: 20 }}/>
                <Formik
                    innerRef={refFormik}
                    initialValues={{
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        timestampPrivacyAccepted: false
                    }}
                    validationSchema={loginSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        placeholder='Nome'
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: (errors.name && touched.name) ? Colors.redDarky : '#ECECEC' 
                                        }}
                                        autoFocus={true} // This is the first one
                                    />
                                    <TextInput
                                        onChangeText={handleChange('surname')}
                                        onBlur={handleBlur('surname')}
                                        value={values.surname}
                                        placeholder='Cognome'
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: (errors.surname && touched.surname) ? Colors.redDarky : '#ECECEC' 
                                        }}
                                        autoFocus={true} // This is the first one
                                    />

                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder='Email'
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: (errors.email && touched.email) ? Colors.redDarky : '#ECECEC' 
                                        }}
                                        autoFocus={true} // This is the first one
                                    />
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: (errors.password && touched.password) ? Colors.redDarky : '#ECECEC' 
                                        }}
                                    />
                                    <TextInput
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        placeholder='Confirm Password'
                                        secureTextEntry={true}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: (errors.confirmPassword && touched.confirmPassword) ? Colors.redDarky : '#ECECEC' 
                                        }}
                                    />

                                    <View style={{ marginTop: 20 }}>
                                        <Text>Registrandoti acconsenti all'informativa sulla Privacy Policy e ai Termini e Condizioni Generali di Utilizzo</Text>
                                        <Text>Privacy Policy {">>"}</Text>
                                        <Text>Terrminie Condizioni {">>"}</Text>
                                    </View>


                                    <View style={{ marginTop: 20 }}>
                                        <SubmitButton title={"Registrati"} isLoading={isLoading} onPress={handleSubmit} />
                                    </View>
                            </View>
                    )}
                </Formik>
                <View style={{ paddingBottom: "20%"}}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: Colors.PRIMARY,
      marginTop: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.PRIMARY,
    textAlign: "center"
  },
})