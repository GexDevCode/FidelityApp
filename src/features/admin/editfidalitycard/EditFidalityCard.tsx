
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { StyleSheet, View,Pressable, Text } from 'react-native'
import { SAFE_AREA_PADDING } from '../../../Constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { object, string } from 'yup';
import { Colors } from '../../../constants/colors';
import { EditFidalityCardDTO } from './types/EditFidalityCardDTO';
import CustomForm, { CustomFormType } from '../../../components/CustomForm';
import { RewardCard } from '../components/RewardCard';
import { useFormik, useFormikContext } from 'formik';

let editSchema = object({
    storeName: string().required("Nessun nome inserito"),
    location: string().required("Nessun indirizzo inserito"),
    category: string().required("Nessun categoria inserito")
  });

export function EditFidalityCardPage({ navigation }: any): ReactElement {
    const [photo, setPhoto] = useState<any>(null);
    const [banner, setBanner] = useState<any>(null);

    const formRef = useRef();
    const [storeRewardCard, setStoreRewardCard] = useState<any>()

    useEffect(() => {
        navigation.setOptions({ title: 'Crea la fidelity card' })
    }, [])

    useEffect(() => {
        onPreview()
    }, [])


    const onSubmit = (values: EditFidalityCardDTO) => {

        if(photo && banner) {
            values.imageUrl = photo;
            values.bannerUrl = banner;
            navigation.push("Invoice", { store: values })
        }

    }

    const handleChoosePhoto = (destination:string) => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
        console.log(response);
        if (response && !response.didCancel) {
            console.log(response)
            destination === "photo" ? setPhoto(response) : setBanner(response);
        }
        });
    };
    
    const onPreview = () => {
        const { values }: any = formRef.current;

        console.log("values", values, photo)
        
        setStoreRewardCard({
            id: '100',
            imageUrl: photo ? photo.assets[0].uri : 'https://rewardapp.s3.eu-north-1.amazonaws.com/flogo_colored.png',
            storeName: values.storeName || '<Nome>',
            branch: [{ location: values.location || '<Indirizzo>'}],
            colorReward: Colors.PRIMARY,
            rewardPoints: 100
        })
    }

    const form: Array<CustomFormType> = [
        { type: "photoProfile", label: 'Store profile', value: "imageUrl", editable: true, photo: photo },
        { type: "photoBanner", label: 'Store banner', value: "bannerUrl", editable: true, banner: banner },
        { type: "text", label: 'Nome', value: "storeName", editable: true },
        { type: "text", label: 'Indirizzo', value: "location", editable: true },
        { type: "dropdown", label: 'Categoria', value: "category", editable: true, items: [
            { label: 'Sushi', value: 'sushi' },
            { label: 'Pizza', value: 'pizza' },
            { label: 'Agenzia', value: 'agenzia' },
        ]}
    ]


    return (
        <View>
                <CustomForm
                    formRef={formRef}
                    form={form} 
                    initialValues={{
                        storeName: '',
                        location: '',
                        category: ''
                    }}
                    validationSchema={editSchema}
                    submitButtonTitle={"Avanti"} 
                    handleChoosePhoto={handleChoosePhoto}
                    onSubmit={onSubmit}
                >
                    <Pressable onPress={onPreview} style={{ alignSelf: "center", marginTop: 30 }}>
                        <Text>Vedi preview reward card</Text>
                    </Pressable>
                    <View style={{ marginTop: 30 }}>
                        <RewardCard store={storeRewardCard} values={formRef.current} />
                    </View>
                </CustomForm>
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