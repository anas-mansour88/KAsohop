import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import i18n from "../langht/i18next";


const getProductCategories = async (categoryId) => {

  const response = await axiosInstance.get(`/Products/category/${categoryId}`);
  

  return response.data?.response?.data || response.data;
};


const useGetProductsByCategories = (categoryId) => {
  return useQuery({

    queryKey: ["get product by category", i18n.language, categoryId],
    
  
    queryFn: () => getProductCategories(categoryId),
    
   
    enabled: !!categoryId,
  });
};

export default useGetProductsByCategories;