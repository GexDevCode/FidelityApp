import axios from 'axios';
import { useEffect, useState } from 'react'
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { Alert } from 'react-native';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';
import { CodeScanner } from '../../components/CodeScannerModal';
import { useHandleErrors } from '../../../../hooks/useHandleError';

export const useScanner = (): any => {
  const [renderError, showError] = useHandleErrors();
  const config = useRESTAPI();
  
  const scanRewardCard = async (data: CodeScanner) => {
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
          await axios.post(config.HOST + "/store/scan", {
            idUser: data.idUser, 
            points: Number(data.points)
          }, headers)

    } catch (error) {
        //show error boundary
        console.log(error)
        showError({
          title: "Errore",
          message: error
        })
    }
  }

  const scanDiscount = async (data: CodeScanner) => {
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
          const res = await axios.post(config.HOST + "/store/claimDiscount", {
            idUserRewardCard: data.idUserRewardCard,
            idDiscount: data.idDiscount
          }, headers)

          console.log("RES", res)
          if(res.data.status !== 200) {
            throw res.data.data
          }
    } catch (error) {
        //show error boundary
        console.log(error)
        showError({
          title: "Errore",
          message: error
        })
    }
  }

  return [renderError, scanRewardCard, scanDiscount];
}