import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import storage from '../../../storage/Storage';
import { Auth } from '../../useAuth';

export const useUser = () => {
  const config = useRESTAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResult>();

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

        const res = await axios.get(config.HOST + "/users"  , {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            },
        })
        
        if(res.data){
            setUser(res.data.data);
        }

    } catch (error) {
      console.log( 'error', error.message);
        //show error boundary
    } finally {
      setIsLoading(false)
    }
  }


  return {isLoading, user};
}

export interface UserResult {
  _id: string;
  imageUrl: string;
  email: string;
  name: string;
  timestampCreated: string;
  timestampTermConditionAccepted: string;
  timestampPrivacyAccepted: string;
}