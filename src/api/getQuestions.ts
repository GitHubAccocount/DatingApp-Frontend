import axios from 'axios';
import type { Question } from './types';

const getQuestions = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/questions`;
  const response = await axios.get<Question[]>(url);
  return response.data;
};

export default getQuestions;
