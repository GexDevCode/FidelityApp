import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import { Auth } from '../../useAuth';
import storage from '../../../storage/Storage';

export const useStoresForYou = () => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storesForYou, setStoresForYou] = useState<StoresForYouResult[]>();

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    try {
        setIsLoading(true)
        const auth: Auth = await storage
          .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
          });


        const res = await axios.get(config.HOST + "/user/stores-for-you"  , {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            },
             params: {
                incrementViews: true
            }
        })
        
        if(res.data){
            setStoresForYou(res.data.data);
        }

    } catch (error) {
      console.log( 'error', error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, storesForYou};
}

export interface StoresForYouResult {
  _id: string;
  imageUrl: string;
  storeName: string;
}