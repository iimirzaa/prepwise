import axios from 'axios';
BASE_URL="http://10.0.2.2:3000/prepwise";
const apiClient=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
});
export default apiClient;