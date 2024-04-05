import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import storage from '../../../storage/Storage';
import { Auth } from '../../useAuth';

export const useDiscounts = (idStore: string | undefined) => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountsClaimable, setDiscountsClaimable] = useState<DiscountResult[]>();
  const [discountsLocked, setDiscountsLocked] = useState<DiscountResult[]>();

  useEffect(() => {
    if(idStore){
      initializDiscounts()
    }
  }, [idStore])

  const initializDiscounts = async () => {
    try {
        setIsLoading(true)
        const auth: Auth = await storage
          .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
          });

        const res = await axios.get<{ data: DiscountResult[]}>(config.HOST + "/user/stores/" + idStore + "/discounts" , {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        })
        
        if(res.data){
          console.log('res.data.data',res.data.data)
            setDiscountsClaimable(res.data.data.filter(discount => discount.canClaim));
            setDiscountsLocked(res.data.data.filter(discount => !discount.canClaim));
        }

    } catch (error) {
      console.log( 'error', error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, discountsClaimable, discountsLocked};
}

export interface DiscountResult {
  _id: string,
  idStore: string,
  imageUrl: string,
  name: string,
  points: number,
  discountPercentage: number,
  isActive: boolean,
  timestampCreated: Date,
  timestampDeleted: Date,
  timestampUpdated: Date,
  canClaim: boolean
}