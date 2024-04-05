import axios from 'axios';
import { useEffect, useState } from 'react'
import { useRESTAPI } from './useRESTAPI';
import { useHandleErrors } from './useHandleError';
import { useNavigation } from '@react-navigation/native';
import storage from '../storage/Storage';
import { DevSettings } from 'react-native';

export type Auth = {
    authType: string,
    accessToken: string
}

export const useAuth = (): any => {
    
    const config = useRESTAPI();
    const [renderError, showError] = useHandleErrors();
    const [auth, setAuth] = useState<Auth | null>()

    useEffect(() => {
        getStorage()
    }, [])

    const getStorage = async () => {
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: false,
        });
        console.log("getStorage()", auth)
        setAuth(auth);
    }

    const register = async (data: { authType: string, data: any }) => {

        const res = await axios.post(config.HOST + "/auth/register", data);        
        console.log('re', res.data.data,)
        if(res.data.status === 500 && res.data) {
            showError({
                title: "Server Error",
                message: res.data.data || res.data.error.message
            })
            throw res.data?.data || "Error server";
        }

        return res.data?.data?.status === "OTP_EMAIL_VERIFICATION";
    }

    const verifyCode = async (dto: {email: string, accountType: string, otpCode : string, type: string } ) => {
        console.log("send", dto)
        const res = await axios.post(config.HOST + "/auth/verify-code", dto);
        
        if(res.data.status === 200) {
            storage.save({
                key: 'auth', // Note: Do not use underscore("_") in key!
                data: {
                    authType: dto.accountType,
                    accessToken: res.data.data.accessToken,
                    isActive: res.data.data.config.isActive
                },
                
                // if expires not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });

            config.TOKEN = res.data.data.accessToken;

            DevSettings.reload()
        }
    
        if(res.data.status === 500 && res.data) {
            showError({
                title: "Server Error",
                message: res.data.message
            })
        }
    }

    const login = async (data: { authType: string, data: any }) => {
        const res = await axios.post(config.HOST + "/auth/login", data);
        console.log(res.data.status, res.data.data);
        if(res.data.status === 200 && res.data.data.accessToken) {
            storage.save({
                key: 'auth', // Note: Do not use underscore("_") in key!
                data: {
                    authType: data.authType,
                    accessToken: res.data.data.accessToken,
                    isActive: res.data.data.config.isActive
                },
              
                // if expires not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });
            
            DevSettings.reload()
        }

        if(res.data.status === 500 && res.data.data) {
            showError({
                title: "Server Error",
                message: res.data.data
            })
        }

    }

    const logout = async (data: { authType: string, data: any }) => {
        await storage.remove({
            key: "auth"
        });
        DevSettings.reload()
    }

    return [renderError, auth, login, register, logout, verifyCode, getStorage];
}