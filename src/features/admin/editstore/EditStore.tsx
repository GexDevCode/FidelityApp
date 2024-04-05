import React, { useEffect, useRef } from 'react'
import { StyleSheet, View,  Text, Pressable } from 'react-native'
import { SAFE_AREA_PADDING } from '../../../Constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { EditStoreDTO } from './types/EditStoreDTO';
import Loader from '../../../views/Loader';
import { useStore } from '../../../providers/Store.provider';
import CustomForm, { CustomFormType } from '../../../components/CustomForm';
import { object, string } from 'yup';
import { Colors } from '../../../constants/colors';
import { RewardCard } from '../../user/store/screens/storeDetails/components/RewardCard/RewardCard';

let editSchema = object({
    storeName: string().required("Nessun nome inserito"),
    location: string().required("Nessun indirizzo inserito"),
    category: string().required("Nessuna categoria inserita")
  });

export function EditStorePage({ navigation }: any): React.ReactElement {

    const { store, getStore, editStore } = useStore();

    const [photo, setPhoto] = React.useState<any>(null);
    const [banner, setBanner] = React.useState<any>(null);

    useEffect(() => {
        navigation.setOptions({ title: 'Modifica Store' });
        getStore()
    }, [])

    const onSubmit = (values: EditStoreDTO) => {
        values.imageUrl = photo ? photo.assets[0] : store.imageUrl;
        values.bannerUrl = banner ? banner.assets[0] : store.bannerUrl;
        editStore(values)
        navigation.goBack();
    }

    const handleChoosePhoto = (destination:string) => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (response && !response.didCancel) {
            destination === "photo" ? setPhoto(response) : setBanner(response);
        }
        });
    };

    if(!store) return <Loader />

    const form: Array<CustomFormType> = [
        { type: "photoProfile", label: 'Store profile', value: "imageUrl", editable: true, photo: photo, defaultValue: store.imageUrl },
        { type: "photoBanner", label: 'Store banner', value: "bannerUrl", editable: true, banner: banner, defaultValue: store.bannerUrl },
        { type: "text", label: 'Nome', value: "storeName", editable: true, defaultValue: store.storeName },
        { type: "text", label: 'Indirizzo', value: "location", editable: true, defaultValue: store.location },
        { type: "dropdown", label: 'Categoria', value: "category", editable: true, defaultValue: store.category,
            items: [
                { label: 'Sushi', value: 'sushi' },
                { label: 'Pizza', value: 'pizza' },
                { label: 'Agenzia', value: 'agenzia' },
            ]}
    ]
    
    console.log("store",store)
    return (
        <CustomForm
            form={form} 
            initialValues={{
                storeName: store.storeName,
                location: (store.invoiceStore as any).address,
                category: store.category
            }}
            validationSchema={editSchema}
            submitButtonTitle={"Salva"} 
            handleChoosePhoto={handleChoosePhoto}
            onSubmit={onSubmit}
        />
        )
}

const styles = StyleSheet.create({
    formContainer: { 
        flex: 1, 
        alignItems: "center", 
        marginTop: 50, 
        paddingHorizontal: SAFE_AREA_PADDING.paddingLeft*2 
    }
})