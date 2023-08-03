import axios from 'axios';

const getQuestions = async () => {
  const url = 'http://localhost:3000/questions';
  const response = await axios.get(url);
  return response.data;
};

export default getQuestions;
