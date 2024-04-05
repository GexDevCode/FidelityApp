import React, { useEffect, useMemo, useRef, useState } from 'react'
import CustomForm, { CustomFormType } from '../../../../components/CustomForm';
import { number, object, string } from 'yup';
import { ConfermationScreen } from '../../../../components/ConfermationScreen';
import { useDiscount } from '../hooks/useDiscount';
import { DiscountDTO } from '../types/DiscountDTO';
import { launchImageLibrary } from 'react-native-image-picker';
import { Pressable, Text, View } from 'react-native';
import { Discount } from '../../components/Discount';
import { Colors } from '../../../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

let editSchema = object({
    name: string().required("Nessun titolo inserito"),
    discountPercentage: number().required('Nessuno sconto inserito.').max(100),
    points: number().required("Nessun punto inserito")
  });

export function CreateDiscount({ navigation }: any): React.ReactElement {

    const [,,createDiscount] = useDiscount();
    const [photo, setPhoto] = useState<any>(null);
    const [discount, setDiscount] = useState<any>();

    const [loading, setLoading] = useState<boolean>(false);
    const [confirmationScreen, setConfirmationScreen] = useState<boolean>(false);

    const formRef = useRef();

    useEffect(() => {
        navigation.setOptions({ title: 'Crea discount' });
        //setConfirmationScreen(true);
    }, [])

    const onSubmit = (values: DiscountDTO) => {

        setLoading(true);

        if(photo && values) {
            values.imageUrl = photo.assets[0];
            createDiscount(values)
            .then(() => {
                setConfirmationScreen(true)
            })
            .catch((err: any) => {
                setLoading(false);
            })
        }
    }

    const handleChoosePhoto = (destination:string) => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
        console.log(response);
        if (response && !response.didCancel) {
            console.log(response)
            setPhoto(response)
        }
        });
    };

    const onPreview = () => {
        const { values }: any = formRef.current;

        console.log("values", values, photo)
        
        setDiscount({
            imageUrl: photo ? photo.assets[0].uri : "",
            name: values.name,
            discountPercentage: values.discountPercentage,
            datetimeCreated: new Date,
            points: values.points
        })
    }


    const form: Array<CustomFormType> = [
        { type: "photoProfile", label: 'Image', value: "imageUrl", editable: true, photo: photo },
        { type: "text", label: 'Titolo', value: "name", editable: true },
        { type: "number", label: 'Punti', value: "points", editable: true },
        { type: "number", label: 'Percentuale sconto', value: "discountPercentage", editable: true },
    ]
    
    if(confirmationScreen) {
        return <ConfermationScreen 
            title="Congratulazioni!"
            description="hai creato con successo un discount"
            navigation={() => {
                setTimeout(() => {
                    navigation.goBack({ refresh: true });
                }, 3000)
                
            }}
        />
    }


    console.log("discount", discount);
    return (
        <>
        <CustomForm
            formRef={formRef}
            description={"Crea il tuo discount personalizzato per farlo sapere ai tuoi clienti"}
            form={form} 
            initialValues={{
                name: '',
                points: '',
                discountPercentage: ''
            }}
            handleChoosePhoto={handleChoosePhoto}
            validationSchema={editSchema}
            submitButtonTitle={"Crea"}
            submitButtonLoading={loading}
            onSubmit={onSubmit}
        >
            <TouchableOpacity onPress={() => onPreview()} style={{ alignSelf: "center", marginTop: 30 }}>
                <Text style={{ color: Colors.black}}>Vedi preview discount</Text>
            </TouchableOpacity>
            {
                discount ?
                <View style={{ marginTop: 20 }}>
                    <Discount {...discount}/>
                </View>
                : null
            }
        </CustomForm>
        </>
    )
}