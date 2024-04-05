import React, { useEffect, useState } from 'react'
import CustomForm, { CustomFormType } from '../../../../components/CustomForm';
import { number, object, string } from 'yup';
import { ConfermationScreen } from '../../../../components/ConfermationScreen';
import DeleteModal from '../../components/DeleteModal';
import SubmitButton from '../../../../components/SubmitButton';
import Loader from '../../../../views/Loader';
import { Colors } from '../../../../constants/colors';
import { SAFE_AREA_PADDING } from '../../../../Constants';
import { View } from 'react-native';
import { DiscountDTO } from '../types/DiscountDTO';
import { useDiscount } from '../hooks/useDiscount';
import { launchImageLibrary } from 'react-native-image-picker';

let editSchema = object({
    name: string().required("Nessun titolo inserito"),
    discountPercentage: number().required('Nessuno sconto inserito.').max(100),
    points: number().required("Nessun punto inserito")
  });


export function DetailDiscount({ navigation, route }: any): React.ReactElement {

    const [,,,editDiscount,deleteDiscount] = useDiscount();
    const [loading, setLoading] = useState<boolean>(false);
    const [photo, setPhoto] = useState<any>(null);
    const [confirmationScreen, setConfirmationScreen] = useState<boolean>(false);

    const [discount, setDiscount] = useState<any>();
    const [deleteModal , setDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({ title: 'Modifica Discount' });
        setDiscount(route.params.discount)
        setPhoto(route.params.discount.imageUrl)
    }, [])

    const onSubmit = (values: DiscountDTO) => {
        setLoading(true);

         
        if(typeof photo != "string") {
            values.imageUrl = photo.assets[0];
        }
        editDiscount({
            id: discount._id,
            ...values
        })
        .then(() => {
            setConfirmationScreen(true)
        })
        .catch((err: any) => {
            setLoading(false);
        })
    }

    const onDelete = () => {
        deleteDiscount(discount)
        .then(() => {
            navigation.goBack()
        }).catch((err: any) => {
            console.log(err);
        })
        
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
    
    if(confirmationScreen) {
        return <ConfermationScreen 
            title="Congratulazioni!"
            description="hai aggiornato con successo un discount"
            navigation={() => {
                setTimeout(() => {
                    navigation.goBack();
                }, 3000)
                
            }}
        />
    }

    if(!discount) return <Loader />

    
    const form: Array<CustomFormType> = [
        { type: "photoProfile", label: 'Image', value: "imageUrl", editable: true, photo: photo },
        { type: "text", label: 'Titolo', value: "name", editable: true, defaultValue: discount.name },
        { type: "number", label: 'Punti', value: "points", editable: true, defaultValue: discount.points },
        { type: "number", label: 'Percentuale sconto', value: "discountPercentage", editable: true, defaultValue: discount.discountPercentage },
    ]

    return (
        <>
        <DeleteModal visible={deleteModal} onPress={onDelete} />
        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: SAFE_AREA_PADDING.paddingRight, paddingTop: 20, backgroundColor: Colors.greyLight }}>
            <SubmitButton 
                title='Delete' 
                isLoading={false} 
                style={{ width: 150, backgroundColor: Colors.redDarky }} 
                styleText={{ color: Colors.white }} 
                onPress={() => { setDeleteModal(true) }}
            />
        </View>
        
        <CustomForm
            description={"Modifica il tuo discount personalizzato per farlo sapere ai tuoi clienti"}
            form={form} 
            initialValues={{
                name: discount.name,
                points: discount.points,
                discountPercentage: discount.discountPercentage
            }}
            validationSchema={editSchema}
            submitButtonTitle={"Salva"}
            submitButtonLoading={loading}
            handleChoosePhoto={handleChoosePhoto}
            onSubmit={onSubmit}
        />
        
        </>

        )
}