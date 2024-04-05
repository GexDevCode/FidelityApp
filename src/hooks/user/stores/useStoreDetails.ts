import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import storage from '../../../storage/Storage';
import { Auth } from '../../useAuth';


export const useStoreDetails = (idStore: string) => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [store, setStore] = useState<StoreDetails>();

  useEffect(() => {
    initializeStore()
  }, [])

  const initializeStore = async () => {
    try {
        setIsLoading(true)
        const auth: Auth = await storage
          .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
          });

        const res = await axios.get(config.HOST + "/user/stores/" + idStore , {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            },
             params: {
                incrementViews: true
            }
        })
        
        if(res.data){
            setStore(res.data.data);
        }

    } catch (error) {
      console.log( 'error', error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, store};
}

export interface StoreDetails {
  _id: string,
  storeName: string,
  imageUrl: string,
  category: string,
  isActive: boolean,
  branch: {managerName: string, location: string}[]
  invoiceStore: {cap: string, province: string, address: string},
}