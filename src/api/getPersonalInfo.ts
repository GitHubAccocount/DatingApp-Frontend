import axios from 'axios';
import type { personalInfo } from './types';

const getPersonalInfo = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/personalInfo`;
  const response = await axios.get<personalInfo[]>(url);
  return response.data;
};

export default getPersonalInfo;
