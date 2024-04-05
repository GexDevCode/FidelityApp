import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { EditStoreDTO } from '../types/EditStoreDTO';

export const useEditStore = (): any => {
  const config = useRESTAPI();

  const editStore = async (data: EditStoreDTO) => {
    try {
        console.log(data);
        return true;
        await axios.put(config.HOST + "/store/edit", {
            headers: {
                Authorization: "Bearer " + config.TOKEN
            },
            body: data
        })
    } catch (error) {
        //show error boundary
    }
  }

  return [editStore];
}