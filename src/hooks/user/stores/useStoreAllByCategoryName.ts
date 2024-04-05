import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import storage from '../../../storage/Storage';
import { Auth } from '../../useAuth';

export const useStoreAllByCategoryName = (categoryName: string) => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stores, setStores] = useState<StoreCategoryByNameResult>();

  useEffect(() => {
    initializeStoreCategories()
  }, [])

  const initializeStoreCategories = async () => {
    try {
      console.log('calling...', categoryName)
        setIsLoading(true)
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });

        const res = await axios.get(config.HOST + "/user/store-categories/all?categoryName=" + categoryName + "", {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        })
        console.log('res',res.data.data)
        if(res.data){
            setStores(res.data.data);
        }

    } catch (error) {
      console.log( 'error',error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }

  console.log('returnning', stores?.stores)
  return {isLoading, stores};
}

export interface StoreCategoryByNameModel {
  id: string,
  name: string,
  imageUrl: string,
}


export interface StoreCategoryByNameResult {
  categoryName: string,
  stores: StoreCategoryByNameModel[]
}