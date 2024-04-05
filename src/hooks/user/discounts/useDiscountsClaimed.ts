import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import { Auth } from '../../useAuth';
import storage from '../../../storage/Storage';

export const useDiscountsClaimed = () => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountClaimed, setDiscountsClaimed] = useState<DiscountClaimed[]>();

  useEffect(() => {
      initializDiscounts()
  }, [])

  const initializDiscounts = async () => {
    try {
        setIsLoading(true)
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });

        const res = await axios.get<{ data: DiscountClaimed[]}>(config.HOST + "/user/discounts-claimed" , {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            },
        })
        
        if(res.data){
          setDiscountsClaimed(res.data.data);
        }

        console.log('discountClaimed', res.data)

    } catch (error) {
      console.log( 'error', error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, discountClaimed};
}

export interface DiscountClaimed {
    _id: string,
    idStore: string,
    points: number,
    discountPercentage: number,
    imageUrl: string,
    name: string,
}
