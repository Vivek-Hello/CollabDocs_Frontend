import env from '@/types/localEnv';
import axios from 'axios';

const axiosConfig =  axios.create({
    baseURL: `${env.baseURL}/api`,
    withCredentials:true,
})

export default axiosConfig;