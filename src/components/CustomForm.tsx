import CheckBox from '@react-native-community/checkbox';
import { Field, Formik } from 'formik';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SAFE_AREA_PADDING, SCREEN_WIDTH } from '../Constants';
import { Colors } from '../constants/colors';
import StyleInput from '../styles/Input';
import DropDownFormik from './DropdownFormik';
import UploadBanner from './UploadBanner';
import UploadProfile from './UploadProfile';
import SubmitButtonAbsolute from './SubmitButtonAbsolute';

export type CustomFormType = { 
    type: 'text' | 'dropdown' | 'photoProfile' | 'photoBanner' | 'text-password' | 'number' | 'textarea'
    label: string 
    value: string
    editable: boolean,
    photo?: any
    banner?: any
    defaultValue?: string
    items?: Array<{ label: string, value: string}>,
}
function CustomForm({ formRef, form, initialValues, validationSchema, submitButtonTitle, submitButtonLoading = false, handleChoosePhoto, description, onChange, onSubmit, children }: any) {
    return (
        <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
                    {description ? <Text style={styles.description}>{description}</Text> : null}
                    <View style={{ paddingTop: 30 }}>
                    {
                        form.map((v: CustomFormType) => {
                            switch (v.type) {
                        
                                case "text":
                                    return (
                                        <TextInput
                                        onChangeText={handleChange(v.value)}
                                        onBlur={handleBlur(v.value)}
                                        value={(values as any)[v.value]}
                                        defaultValue={v.defaultValue}
                                        placeholder={v.label}
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : Colors.greyInput
                                        }}
                                        editable={v.editable}
                                    />
                                    )
                                case "textarea":
                                    return (
                                        <TextInput
                                        onChangeText={handleChange(v.value)}
                                        onBlur={handleBlur(v.value)}
                                        value={(values as any)[v.value]}
                                        defaultValue={v.defaultValue}
                                        placeholder={v.label}
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        multiline={true}
                                        numberOfLines={10}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            height:200, textAlignVertical: 'top',
                                            borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : Colors.greyInput
                                        }}
                                        editable={v.editable}
                                    />
                                    )
                                case "number":
                                    return (
                                        <TextInput
                                        onChangeText={handleChange(v.value)}
                                        onBlur={handleBlur(v.value)}
                                        value={(values as any)[v.value]}
                                        defaultValue={v.defaultValue?.toString()}
                                        placeholder={v.label}
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : Colors.greyInput
                                        }}
                                        editable={v.editable}
                                        keyboardType="numeric"
                                    />
                                    )
                                case "text-password":
                                    return (
                                        <TextInput
                                        onChangeText={handleChange(v.value)}
                                        onBlur={handleBlur(v.value)}
                                        value={(values as any)[v.value]}
                                        defaultValue={v.defaultValue}
                                        placeholder={v.label}
                                        autoCapitalize="none" 
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        style={{ 
                                            ...StyleInput.input, 
                                            borderWidth: 1, 
                                            borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : Colors.greyInput
                                        }}
                                        editable={v.editable}
                                    />
                                    )
                                case "dropdown":
                                    return (
                                        <DropDownFormik
                                            name={v.value}
                                            defaultValue={v.defaultValue}
                                            placeholder={v.label}
                                            items={v.items}
                                            style={{ 
                                                ...StyleInput.input,
                                                borderWidth: 1, 
                                                borderColor: ((errors as any)[v.value] && (touched as any)[v.value]) ? Colors.redDarky : Colors.greyInput 
                                            }}
                                        />
                                    );
                                
                                case "photoBanner":
                                    return(<View style={{ marginTop: 20 }}>
                                        <UploadBanner banner={v.banner} handleChoosePhoto={handleChoosePhoto} defaultValue={v.defaultValue} />
                                    </View>)
                                case "photoProfile":
                                    return(<View style={{ alignSelf: "center" }}>
                                        <UploadProfile photo={v.photo} handleChoosePhoto={handleChoosePhoto} defaultValue={v.defaultValue} />
                                    </View>);
                                default:
                                    break;
                            }
                        })
                    }
                    </View>                        


                    {children}

                        <View style={{ height: 200 }} />
                </ScrollView>
                <SubmitButtonAbsolute 
                    title={submitButtonTitle} 
                    isLoading={submitButtonLoading} 
                    onPress={handleSubmit}
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
        )}
        
    </Formik>
    );
  }

  const styles = StyleSheet.create({
    formContainer: {
        paddingTop: 30, 
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
        backgroundColor: Colors.greyLight 
    },
    description: {
        fontSize: 19,
        fontWeight: 'bold',
        backgroundColor: Colors.greyLight,
        color: Colors.black,
        textAlign: "center"
      }
})

export default CustomForm;