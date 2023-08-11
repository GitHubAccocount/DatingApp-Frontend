import axios from 'axios';
import type { Answers } from './types';

const getAnswers = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/answers`;
  const response = await axios.get<Answers[]>(url);
  return response.data;
};

export default getAnswers;
