import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { DiscountDTO } from '../types/DiscountDTO';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';
import { useState } from 'react';

export const useDiscount = (): any => {
  const config = useRESTAPI();

  const [discounts, setDiscounts] = useState<any>([]);

  const getDiscounts = async () => {
    try {        
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });

        const res = await axios.get(config.HOST + "/store/discounts", {
          headers: {
              Authorization: "Bearer " + auth.accessToken
          }
      });

        if(res.data.status === 200) {
          setDiscounts(res.data.data);
        }

    } catch (error) {
        //show error boundary
    }
  }

  const createDiscount = async (data: DiscountDTO) => {
    try {        
      console.log("Call create discount...", data)

      var bodyFormData = new FormData();
      bodyFormData.append("data", JSON.stringify(data));
      bodyFormData.append("file", {
        uri: data.imageUrl.uri,
        type: data.imageUrl.type,
        name: data.imageUrl.fileName
    });
      const auth: Auth = await storage
      .load({
        key: 'auth',
        autoSync: true,
        syncInBackground: true,
      });
      const res = await axios.post(config.HOST + "/store/discount", bodyFormData, {
        headers: {
            Accept: 'application/json',
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + auth.accessToken
        }
    });

    console.log("RESPONSE", res);

    if(res.data.status === 200) {
      setDiscounts([
        ...discounts,
        res.data.data
      ]);
    }

    if(res.data.status === 500) {
      throw res.data.message;
    }

  } catch (error) {
      //show error boundary
      console.log(error)
      throw "Error server"
  }
  }

  const editDiscount = async (data: DiscountDTO) => {
    try {
        

        data.points = Number(data.points);
        data.discountPercentage = Number(data.discountPercentage);
        console.log("Call edit discount...", data)

        var bodyFormData = new FormData();
        bodyFormData.append("data", JSON.stringify(data));

        if(typeof data.imageUrl === "object") {
          bodyFormData.append("file", {
            uri: data.imageUrl.uri,
            type: data.imageUrl.type,
            name: data.imageUrl.fileName
          });
        }

        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });
        const res = await axios.post(config.HOST + "/store/discount/update", bodyFormData, {
          headers: {
            Accept: 'application/json',
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + auth.accessToken
          },
        });

        console.log("RESPONSE", res);

        if(res.data.status !== 200) throw res.data.data;
    } catch (error) {
        //show error boundary
        console.log(error)
    }
  }

  const deleteDiscount = async (data: DiscountDTO) => {
    try {        
        console.log("Call delete discount...", data)
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });

        const res = await axios.delete(config.HOST + "/store/discount/" + data._id, {
          headers: {
              Authorization: "Bearer " + auth.accessToken
          }
        });

        if(res.data.status !== 200) {
          throw res.data.data;
        }

    } catch (error) {
        //show error boundary
        console.log(error)
    }
  }

  return [discounts, getDiscounts, createDiscount, editDiscount, deleteDiscount];
}