import { useFormikContext, useField } from "formik";
import React, { useMemo, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../constants/colors";

const DropDownFormik = ({ ...props }: any) => {
  const [openProvider, setOpenProvider] = useState(false);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useMemo(() => {
    if(props.defaultValue) setFieldValue(field.name, props.defaultValue);
  },[])
  return (
    <DropDownPicker
      {...field}
      {...props}
      value={field.value}
      open={openProvider}
      textStyle={{ color: Colors.black }}
      labelStyle={{ color: Colors.black }}
      arrowIconStyle={{tintColor: Colors.black}}
      placeholderStyle={{
        color: Colors.grey
      }}
      dropDownContainerStyle={{
        zIndex: 9999,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.greyLight,
        backgroundColor: Colors.white
      }}
      dropDownDirection="AUTO"
      bottomOffset={300}
      setOpen={setOpenProvider}
      setValue={(val: any) => {
        setFieldValue(field.name, val());
      }}
    />
  );
};

export default DropDownFormik;