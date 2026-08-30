import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log(config.headers.Authorization);
      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
