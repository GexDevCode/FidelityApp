import React, { useEffect, useState } from 'react'
import CustomForm, { CustomFormType } from '../../../../components/CustomForm';
import { object, string } from 'yup';
import { CreateBranchDTO } from '../types/CreateBranchDTO';
import { ConfermationScreen } from '../../../../components/ConfermationScreen';
import { useBranch } from '../hooks/useBranch';
import DeleteModal from '../../components/DeleteModal';
import SubmitButton from '../../../../components/SubmitButton';
import Loader from '../../../../views/Loader';
import { Colors } from '../../../../constants/colors';
import { SAFE_AREA_PADDING } from '../../../../Constants';
import { View } from 'react-native';

let editSchema = object({
    username: string().required("Nessun username inserito"),
    password: string().required('Nessuna password inserita.'),
    managerName: string().required("Nessun nome manager inserito"),
    location: string().required("Nessuna indirrizzo inserito")
  });

export function DetailBranch({ navigation, route }: any): React.ReactElement {

    const [,,,editBranch,deleteBranch] = useBranch();
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmationScreen, setConfirmationScreen] = useState<boolean>(false);

    const [branch, setBranch] = useState<any>();
    const [deleteModal , setDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({ title: 'Crea un branch' });
        setBranch(route.params.branch)
        //setConfirmationScreen(true);
    }, [])

    const onSubmit = (values: CreateBranchDTO) => {
        setLoading(true);
        editBranch(values)
        .then(() => {
            setConfirmationScreen(true)
        })
        .catch((err: any) => {
            setLoading(false);
        })
    }

    const onDelete = () => {
        deleteBranch(branch._id)
        navigation.goBack()
    }

    const form: Array<CustomFormType> = [
        { type: "text", label: 'Username', value: "username", editable: true },
        { type: "text-password", label: 'Password', value: "password", editable: true },
        { type: "text", label: 'Nome Manager', value: "managerName", editable: true },
        { type: "text", label: 'Indirizzo', value: "location", editable: true },
    ]
    
    if(confirmationScreen) {
        return <ConfermationScreen 
            title="Congratulazioni!"
            description="hai creato con successo un branch"
            navigation={() => {
                setTimeout(() => {
                    navigation.goBack();
                }, 3000)
                
            }}
        />
    }

    if(!branch) return <Loader />

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
            description={"Crea il tuo branch cosi puoi facilitarti la gestione delle tue attività"}
            form={form} 
            initialValues={{
                username: branch.username,
                password: branch.password,
                managerName: branch.managerName,
                location: branch.location
            }}
            validationSchema={editSchema}
            submitButtonTitle={"Salva"}
            submitButtonLoading={loading}
            onSubmit={onSubmit}
        />
        
        </>

        )
}