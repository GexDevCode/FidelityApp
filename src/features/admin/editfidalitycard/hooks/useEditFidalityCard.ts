import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { EditFidalityCardDTO } from '../types/EditFidalityCardDTO';

export const useEditFidalityCard = (): any => {
  const config = useRESTAPI();

  const editFidalityCard = async (data: EditFidalityCardDTO) => {
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

  return [editFidalityCard];
}