import axios from 'axios';
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { BranchDTO } from '../types/BranchDTO';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';
import { useState } from 'react';

export const useBranch = (): any => {
  const config = useRESTAPI();

  const [branches, setBranches] = useState<any>();

  const getBranches = async () => {
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
        const res = await axios.get(config.HOST + "/store/branch", headers);

        if(res.data.status === 200) {
          setBranches(res.data.data);
        }

    } catch (error) {
        //show error boundary
    }
  }

  const createBranch = async (data: BranchDTO) => {
    try {
        await axios.post(config.HOST + "/store/branch", data, {
          headers: {
              Authorization: "Bearer " + config.TOKEN
          },
        })
    } catch (error) {
        //show error boundary
    }
  }

  const editBranch = async (data: BranchDTO) => {
    try {
        await axios.put(config.HOST + "/store/branch", data, {
          headers: {
              Authorization: "Bearer " + config.TOKEN
          },
        })
    } catch (error) {
        //show error boundary
    }
  }

  const deleteBranch = async (id: string) => {
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

        return await axios.delete(config.HOST + "/store/branch/" + id, headers);

    } catch (error) {
        //show error boundary
    }
  }

  return [branches, getBranches, createBranch, editBranch, deleteBranch];
}