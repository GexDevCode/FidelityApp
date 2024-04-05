// AuthContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import { useRESTAPI } from '../hooks/useRESTAPI';
import { ActiveStoreDTO, EditStoreDTO, Store } from '../types/Store';
import { Auth, useAuth } from '../hooks/useAuth';
import axios from 'axios';
import storage from '../storage/Storage';
import { useHandleErrors } from '../hooks/useHandleError';
import { DevSettings } from 'react-native';
import { useModalError } from './ModalError.provider';

export const StoreContext = createContext({
    store: {
        _id: "",
        imageUrl: "",
        bannerUrl: "",
        storeName: "",
        category: "",
        branch: [],
        invoiceStore: {},
        subscriptionId: "",
        customerId: "",
        isActive: false,
        location: "",
        datetimeCreated: null,
        datetimeUpdated: null
    },
    selectedStore: {
        _id: "",
        isAdmin: false,
        imageUrl: "",
        bannerUrl: "",
        managerName: "",
        category: "",
        isActive: false,
        location: "",
        datetimeCreated: null,
        datetimeUpdated: null
    },
    getStore: () => {},
    editStore: (data: EditStoreDTO) => {},
    activeStore: (data: ActiveStoreDTO) => {},
    selectStore: (id: string) => {}
});

const StoreProvider = ({ children }: any) => {
    const { showError } = useModalError();
    const config = useRESTAPI();
    const [,auth] = useAuth();

    const [store, setStore] = useState<Store>();
    const [selectedStore, setSelectedStore] = useState<any>()

    useEffect(() => {
        if(auth) {
            getStore()
        }
    }, [])

    const getStore = async () => {
        try {
            const auth: Auth = await storage
            .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
            });

            const res = await axios.get(config.HOST + "/store", {
                headers: { Authorization: "Bearer " + auth.accessToken }
            })

            setStore(res.data.data)
            setSelectedStore({ ...res.data.data, isAdmin: true })
        } catch (error) {
            //show error boundary
        }
    }

    const editStore = async (data: EditStoreDTO) => {
            console.log("Call edit store...", data)
            const auth: Auth = await storage
            .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
            });

            var bodyFormData = new FormData();
            bodyFormData.append("data", JSON.stringify(data));
            if(typeof data.imageUrl === "object") {
                const { uri, type, fileName } = data.imageUrl.assets[0]
                bodyFormData.append("imageUrl", {
                    uri,
                    type,
                    name: fileName,
                });
            }
            if(typeof data.bannerUrl === "object") {
                const { uri, type, fileName} = data.bannerUrl.assets[0]
                bodyFormData.append("bannerUrl", {
                    uri,
                    type,
                    name: fileName,
                });
            }

            console.log("bodyFormData", bodyFormData);
            const res = await axios.put(config.HOST + "/store", bodyFormData, {
                headers: { 
                    Accept: 'application/json',
                    "content-type": "multipart/form-data",
                    Authorization: "Bearer " + auth.accessToken 
                }
            })

            if(res.data.status !== 200) {
                showError({ title: "Errore", message: res.data.data })
            }else {
              setStore(res.data.data);
            }
    }
    
    const activeStore = async (data: ActiveStoreDTO) => {
        try {
            console.log("Call active store...", data)
            const auth: Auth = await storage
            .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
            });

            await axios.put(config.HOST + "/store/active", data, {
                headers: { 
                    Accept: 'application/json',
                    Authorization: "Bearer " + auth.accessToken 
                }
            })

            DevSettings.reload();
        } catch (error) {
            //show error boundary
            console.log(error)
        }
    }
    
    const selectStore = async (id: string) => {
        if(store && store.branch) {
            const branch: any = store?.branch.find((branch: any) => branch._id === id)
            if(branch && branch._id) setSelectedStore({ ...branch, isAdmin: false });
            if(!branch._id && (auth as Auth).authType === "STORE") {
                setSelectedStore({ ...store, isAdmin: true });
            }
            return true;
        }

        console.log("Invalid Store selected")
    }

    return (
        <StoreContext.Provider value={{ store, selectedStore, getStore, editStore, activeStore, selectStore }}>
        {children}
        </StoreContext.Provider>
    );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };