import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { InvoiceDTO } from '../types/InvoiceDTO';

export const useEditFidalityCard = (): any => {
  const config = useRESTAPI();

  const completeRegistration = async (data: InvoiceDTO) => {
    try {
        console.log(data);
        return true;
        await axios.put(config.HOST + "/store/fidality", {
            headers: {
                Authorization: "Bearer " + config.TOKEN
            },
            body: data
        })
    } catch (error) {
        //show error boundary
    }
  }

  return [completeRegistration];
}