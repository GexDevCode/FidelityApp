import axios, { AxiosError } from 'axios';
import { useRESTAPI } from './useRESTAPI';
import { Auth } from './useAuth';
import storage from '../storage/Storage';
import { useStore } from '../providers/Store.provider';
import { useHandleErrors } from './useHandleError';
import { DevSettings } from 'react-native';
import { useModalError } from '../providers/ModalError.provider';

export const useStripeAPI = (): any => {
  const config = useRESTAPI();
  const { store } = useStore();
  const { showError } = useModalError();

  const URL_BASE = "/api/stripe"

  const paymentSheet = async (data: any) => {
    try {
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });
        const headers = {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        }

  
        return await axios.post(`${config.HOST}/store/subscribe`, data, headers);
    } catch (error) {
        //show error boundary
        console.log("Error", error);
    }
  }

  const cancelSubscription = async () => {

      console.log("Cancel.....", store.subscriptionId)
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });
        const headers = {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        }

        const res = await axios.put(`${config.HOST}/store/subscription/cancel`, {
         subscriptionId: store.subscriptionId
        }, headers);


        console.log("Res", res.data)
        if(res.data.status !== 200) {
          showError({ title: "Errore", message: res.data.data })
        }else {
          DevSettings.reload();
        }

        
  }

  return { paymentSheet, cancelSubscription };
}