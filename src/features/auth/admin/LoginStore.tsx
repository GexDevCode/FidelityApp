import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { Colors } from '../../../constants/colors'
import { SAFE_AREA_PADDING } from '../../../Constants'
import { Formik } from 'formik'
import StyleInput from '../../../styles/Input'
import { useAuth } from '../../../hooks/useAuth'
import { object, string } from 'yup'
import SubmitButton from '../../../components/SubmitButton'

let loginSchema = object({
  email: string().required('No Email provided.'),
  password: string().required('No Password provided.') 
  //.min(8, 'Password is too short - should be 8 chars minimum.')
  //.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

export function LoginStore({ navigation }: any): React.ReactElement {

    const [error,,login] = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSubmit = (values: any) => {
        setIsLoading(true);

        login({
            authType: "STORE",
            data: {
                store: values
            }
        })

        setIsLoading((prev) => !prev);
    }


  return (
    <View style={styles.container}>
        {error}
        <Image 
          src={"../../assets/logo/flogo_colored.png"} 
          style={{width: 40, height: 40, marginTop: "30%"}}
        />


                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={loginSchema}
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

                                    <View style={{ marginTop: 20 }}>
                                        <SubmitButton title={"Accedi"} isLoading={isLoading} onPress={handleSubmit} />
                                    </View>
                                    
                                    
                                    <TouchableOpacity onPress={() => navigation.push("RegisterStore")}>
                                        <Text style={{ ...styles.text, marginTop: 20 }}>Non sei registrato?</Text>
                                        </TouchableOpacity>
                            </View>
                    )}
                </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: "20%",
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