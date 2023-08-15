import axios from 'axios';
import type { PersonalInfo } from './types';

const getPersonalInfo = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/personalInfo`;
  const response = await axios.get<PersonalInfo[]>(url);
  return response.data;
};

export default getPersonalInfo;
