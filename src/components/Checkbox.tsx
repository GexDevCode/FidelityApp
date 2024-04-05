import CheckBox from '@react-native-community/checkbox';
import { Field } from 'formik';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

function Checkbox({ children, name, value }: any) {
    return (
      <Field name={name} type="boolean">
        {({ field, form }: any) => (
            <View>
                <CheckBox
                    boxType='square'
                    disabled={false}
                    value={value}
                    onChange={() => {
                      field.onChange(name)
                      form.setFieldTouched(name, true);
                    }}
                />
              <Text>{children}</Text>
            </View>
        )}
      </Field>
    );
  }

export default Checkbox;