import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../api/axiosInstance";
import i18n from "../langht/i18next";




const getProducts = async () => {
  const response = await axiosInstance.get("/Products?limit=10");
  return response.data.response.data;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["Products",i18n.language], 
    queryFn: getProducts,
  });
};


export default useProducts;