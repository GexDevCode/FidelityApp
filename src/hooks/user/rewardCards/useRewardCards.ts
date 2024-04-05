import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRESTAPI } from '../../useRESTAPI';
import storage from '../../../storage/Storage';
import { Auth } from '../../useAuth';
import { useToast } from "react-native-toast-notifications";

export const useRewardCards = (idStore: string | undefined) => {
  const config = useRESTAPI();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rewardCard, setRewardCard] = useState<RewardCardPutResult>();
  const [previousCard, setPreviousCard] = useState<RewardCardPutResult | null>(null);
  const POLLING_INTERVAL = 8000;

  useEffect(() => {
    let intervalId: any;
    if(idStore){
      initializeRewardCard();

      // Start polling every 5 seconds
      intervalId = setInterval(initializeRewardCard, POLLING_INTERVAL);
    }

    return () => {
      if(intervalId){
        clearInterval(intervalId);
      }
    };
  }, [idStore]);

  useEffect(() => {
    if (previousCard && rewardCard) {
      if (rewardCard.points > previousCard.points) {
        const difference = rewardCard.points - previousCard.points;
        toast.show("Congratulazioni! Hai ricevuto " + difference + " punti", { type: "rewardCard" });
      } else if (rewardCard.points < previousCard.points) {
        toast.show("Congratulazioni! Hai appena ottenuto un premio", { type: "rewardCard" });
      }
    }
    setPreviousCard(rewardCard);
  }, [rewardCard, previousCard]);

  const initializeRewardCard = async () => {
    console.log('calling...')
    try {
      setIsLoading(true);
      const auth: Auth = await storage.load({
        key: 'auth',
        autoSync: true,
        syncInBackground: true,
      });

      const configRequest = {
        method: 'put',
        maxBodyLength: Infinity,
        url: config.HOST + `/user/stores/${idStore}/reward-cards`,
        headers: {
          'Authorization': "Bearer " + auth.accessToken
        }
      };

      const result = await axios.request(configRequest);

      if (result.data) {
        const newRewardCard = result.data.data as RewardCardPutResult;
        setRewardCard(newRewardCard);
      }
    } catch (error) {
      console.log('error', JSON.stringify(error));
      //show error boundary
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, rewardCard};
};

export interface RewardCardPutResult {
  _id: string;
  idUser: string;
  idStore: string;
  points: number;
  timestampCreated: string;
}
