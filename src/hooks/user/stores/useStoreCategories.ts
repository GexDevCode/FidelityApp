import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import { Auth } from '../../useAuth';
import storage from '../../../storage/Storage';

export const useStoreCategories = () => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storeCategories, setStoreCategories] = useState<StoreAllByCategoryNameResult[]>();

  useEffect(() => {
    initializeStoreCategories()
  }, [])

  const initializeStoreCategories = async () => {
    try {
        setIsLoading(true)
        const auth: Auth = await storage
          .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
          });

        const res = await axios.get(config.HOST + "/user/store-categories", {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        })

        if(res.data){
            setStoreCategories(res.data.data);
        }

    } catch (error) {
      console.log( 'error',error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, storeCategories};
}

export interface StoreAllByCategoryNameModel {
  id: string,
  name: string,
  imageUrl: string,
}


export interface StoreAllByCategoryNameResult {
  categoryName: string,
  stores: StoreAllByCategoryNameModel[]
}