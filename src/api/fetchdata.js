import api from './api';
const fetchData = async () => {
  const { data } = await api.get('/');
  return data;
};
export default fetchData;