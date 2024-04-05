import axios from 'axios';
import { useRESTAPI } from './useRESTAPI';
import { CreateDiscountDTO, DeleteDiscountDTO, EditDiscountDTO, GetDiscountDTO } from '../types/Discounts';
import { Auth } from './useAuth';
import storage from '../storage/Storage';
import { useModalError } from '../providers/ModalError.provider';

export const useDiscounts = (): any => {
  const config = useRESTAPI();

  const { showError } = useModalError();

  const URL_BASE = "/store/discount"

  const getDiscount = async (data: GetDiscountDTO) => {
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
        const res = await axios.get(config.HOST + URL_BASE + "/" + data._id, headers)

        if(res.data.status !== 200) {
            showError({ title: "Errore", message: res.data.data })
        }
    } catch (error: any) {
        //show error boundary
        showError({ title: "Errore", message: typeof error === "string" ? error : error.message })
    }
  }

  const getDiscounts = async () => {
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
        const res = await axios.get(config.HOST + URL_BASE + "/discounts", headers)

        if(res.data.status !== 200) {
            showError({ title: "Errore", message: res.data.data })
        }
    } catch (error: any) {
        //show error boundary
        showError({ title: "Errore", message: typeof error === "string" ? error : error.message })
    }
  }

  const editDiscount = async (data: EditDiscountDTO) => {
    try {
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });
        const headers = {
            headers: {
                Accept: 'application/json',
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + auth.accessToken
            }
        }

        var bodyFormData = new FormData();
        bodyFormData.append("data", JSON.stringify(data));
        if(typeof data.imageUrl === "object") {
            const { uri, type, fileName } = data.imageUrl.assets[0]
            bodyFormData.append("imageUrl", {
                uri,
                type,
                name: fileName,
            });
        }

        const res = await axios.put(config.HOST + URL_BASE + "/discount", bodyFormData, headers);

        
        if(res.data.status !== 200) {
            showError({ title: "Errore", message: res.data.data })
        }
    } catch (error: any) {
        //show error boundary
        showError({ title: "Errore", message: typeof error === "string" ? error : error.message })
    }
  }

  const createDiscount = async (data: CreateDiscountDTO) => {
    try {
        const auth: Auth = await storage
        .load({
          key: 'auth',
          autoSync: true,
          syncInBackground: true,
        });
        const headers = {
            headers: {
                Accept: 'application/json',
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + auth.accessToken
            }
        }

        var bodyFormData = new FormData();
        bodyFormData.append("data", JSON.stringify(data));
        if(typeof data.imageUrl === "object") {
            const { uri, type, fileName } = data.imageUrl.assets[0]
            bodyFormData.append("imageUrl", {
                uri,
                type,
                name: fileName,
            });
        }

        const res = await axios.post(config.HOST + URL_BASE + "/discount", bodyFormData ,headers);

        if(res.data.status !== 200) {
            showError({ title: "Errore", message: res.data.data })
        }
    } catch (error: any) {
        //show error boundary
        showError({ title: "Errore", message: typeof error === "string" ? error : error.message })
    }
  }

  const deleteDiscount = async (data: DeleteDiscountDTO) => {
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
        const res = await axios.delete(config.HOST + URL_BASE + "/discount/" + data._id, headers);

        if(res.data.status !== 200) {
            showError({ title: "Errore", message: res.data.data })
        }
    } catch (error: any) {
        //show error boundary
        showError({ title: "Errore", message: typeof error === "string" ? error : error.message })
    }
  }

  return [getDiscount, getDiscounts, editDiscount, createDiscount, deleteDiscount];
}