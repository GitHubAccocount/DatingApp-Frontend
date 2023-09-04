import axios from 'axios';
import type { Blog } from './types';

const getBlogs = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/blogs`;
  const response = await axios.get<Blog[]>(url);
  return response.data;
};

export default getBlogs;
