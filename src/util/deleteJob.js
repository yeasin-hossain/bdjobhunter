/* eslint-disable consistent-return */
import axios from 'axios';
import { getFromStorage } from './localStore';

/* eslint-disable import/prefer-default-export */
export const deleteJob = async (jobId) => {
  try {
    const deletedJob = await axios.delete(`${process.env.REACT_APP_API_URL}api/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${getFromStorage()}`,
      },
    });
    return deletedJob;
  } catch (error) {
    console.log(error);
    return false;
  }
};
