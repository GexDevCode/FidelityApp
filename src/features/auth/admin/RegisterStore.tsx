import React, { useState, useRef } from 'react'
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView } from 'react-native'
import { Colors } from '../../../constants/colors'
import { SAFE_AREA_PADDING } from '../../../Constants'
import { Formik } from 'formik'
import StyleInput from '../../../styles/Input'
import { useAuth } from '../../../hooks/useAuth'
import { object, string } from 'yup'
import SubmitButton from '../../../components/SubmitButton'
import Title from '../../../components/Title'
import { AppIcon } from '../../../assets/icons/AppIcon'

let registerSchema = object({
    email: string().required('Nessun nome inserito'),
    password: string().required('Nessun password inserito'),
    confirmPassword: string().required().test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
    }),
});

export function RegisterStore({ navigation }: any): React.ReactElement {
    const refFormik = useRef(null);
    const [error,,, register] = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSubmit = async (values: any) => {
        try{
            setIsLoading(true);

            const isSuccess = await register({
                authType: "STORE",
                data: {
                    store: {
                        typeSign: "EMAIL",
                        storeName: "testhere",
                        ...values,
                        timestampPrivacyAccepted: new Date,
                        timestampTermConditionAccepted: new Date
                    }
                }
            })

            if(isSuccess){
                navigation.navigate("RegisterVerificationStore", { formRegistration: (refFormik.current as any)?.values })
            }            
           
        } finally {
             setIsLoading((prev) => !prev);
        }
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
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={registerSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
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
                                        <Text>Termini e Condizioni {">>"}</Text>
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