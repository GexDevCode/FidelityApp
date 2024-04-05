import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import { Colors } from '../../../constants/colors'
import { SAFE_AREA_PADDING } from '../../../Constants'
import { Formik } from 'formik'
import StyleInput from '../../../styles/Input'
import { useAuth } from '../../../hooks/useAuth'
import { object, string } from 'yup'
import SubmitButton from '../../../components/SubmitButton'

const MAX_OTP_CODE = 5;
let registerVerificationSchema = object({
    otpCode: string()
            .required('No otp code provided.')
            .min(MAX_OTP_CODE, `Almeno ${MAX_OTP_CODE} caratteri`)
            .max(MAX_OTP_CODE, `Massimo ${MAX_OTP_CODE} caratteri`),
  });

export function RegisterVerificationUser({ navigation, route}: any): React.ReactElement {
    const formRegistration = route.params.formRegistration;
    
    const [error, ,,, verifyCode] = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSubmit = (values: {otpCode : string}) => {
        setIsLoading(true)

        verifyCode({
            email: formRegistration.email,
            otpCode: values.otpCode,
            type: "registration",
            accountType: "USER"
        } as {email: string, accountType: string, otpCode : string, type: string } )

        setIsLoading((prev) => !prev);
    }
    console.log('error?.message',error)

  return (
    <ScrollView style={styles.container}>
        <Text>Ti abbiamo mandato un codice di verifica sulla tua mail {formRegistration.email}</Text>
        <Formik
            initialValues={{
              otpCode:'',
            }}
            validationSchema={registerVerificationSchema}
            onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                            <TextInput
                                onChangeText={handleChange('otpCode')}
                                onBlur={handleBlur('otpCode')}
                                value={values.otpCode}
                                placeholder='Codice otp'
                                autoCapitalize="none" 
                                autoCorrect={false}
                                keyboardType="number-pad"
                                style={{ 
                                    ...StyleInput.input, 
                                    borderWidth: 1, 
                                    borderColor: (errors.otpCode && touched.otpCode) ? Colors.redDarky : '#ECECEC' 
                                }}
                                autoFocus={true}
                                maxLength={MAX_OTP_CODE}
                            />
                            {error}
                            <View style={{ marginTop: 20 }}>
                                <SubmitButton title={"Verifica codice"} isLoading={isLoading} onPress={handleSubmit} />
                            </View>
                    </View>
            )}
                </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    paddingTop:"30%",
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