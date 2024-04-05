import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';
import { useState } from 'react';

export const usePackage = (): any => {
  const config = useRESTAPI();
  const [packages, setPackages] = useState<any>();
  const [packageSelected, setPackage] = useState<any>();

  const getPackages = async () => {
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
      const res =  await axios.get(config.HOST + "/store/package", headers);

      if(res.data.status === 200) {
        setPackages(res.data.data);
      }
    } catch (error) {
        //show error boundary
    }
  }

  const getPackageSeleted = async () => {
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
      const res =  await axios.get(config.HOST + "/store/package/selected", headers);

      if(res.data.status === 200) {
        setPackage(res.data.data);
      }
    } catch (error) {
        //show error boundary
    }
  }

  return { packages, packageSelected, getPackages, getPackageSeleted };
}