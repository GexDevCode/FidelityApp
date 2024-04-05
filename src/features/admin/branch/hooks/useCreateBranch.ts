import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { CreateBranchDTO } from '../types/CreateBranchDTO';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';

export const useCreateBranch = (): any => {
  const config = useRESTAPI();

  const createBranch = async (data: CreateBranchDTO) => {
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
        await axios.post(config.HOST + "/store/branch", data, headers)
    } catch (error) {
        //show error boundary
    }
  }

  return [createBranch];
}