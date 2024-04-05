import React, { useEffect, useState } from 'react'
import CustomForm, { CustomFormType } from '../../../../components/CustomForm';
import { object, string } from 'yup';
import { CreateBranchDTO } from '../types/CreateBranchDTO';
import { useCreateBranch } from '../hooks/useCreateBranch';
import { ConfermationScreen } from '../../../../components/ConfermationScreen';

let editSchema = object({
    username: string().required("Nessun username inserito"),
    password: string().required('Nessuna password inserita.'),
    managerName: string().required("Nessun nome manager inserito"),
    location: string().required("Nessuna indirrizzo inserito")
  });

export function CreateBranch({ navigation }: any): React.ReactElement {

    const [createBranch] = useCreateBranch();
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmationScreen, setConfirmationScreen] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({ title: 'Crea un branch' });
        //setConfirmationScreen(true);
    }, [])

    const onSubmit = (values: CreateBranchDTO) => {
        setLoading(true);
        createBranch(values)
        .then(() => {
            setConfirmationScreen(true)
        })
        .catch((err: any) => {
            setLoading(false);
        })
        
        
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

    return (
        <>
        <CustomForm
            description={"Crea il tuo branch cosi puoi facilitarti la gestione delle tue attività"}
            form={form} 
            initialValues={{
                username: '',
                password: '',
                managerName: '',
                location: ''
            }}
            validationSchema={editSchema}
            submitButtonTitle={"Crea"}
            submitButtonLoading={loading}
            onSubmit={onSubmit}
        />
        </>

        )
}