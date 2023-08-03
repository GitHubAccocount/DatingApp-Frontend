import axios from 'axios';
import type { Question } from './types';

const getQuestions = async () => {
  const url = 'http://localhost:3000/questions';
  const response = await axios.get<Question>(url);
  return response.data;
};

export default getQuestions;
