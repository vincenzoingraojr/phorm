import { REACT_APP_SERVER_ORIGIN } from "@env";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: REACT_APP_SERVER_ORIGIN,
    timeout: 10000,
});

export default axiosInstance;
