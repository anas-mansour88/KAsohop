import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import i18n from "../langht/i18next";

const getCategories = async (limit) => {
  const response = await axiosInstance.get(`/Categories?`,  {  params: { limit: limit } });
  console.log(response.data.response)
   
  return response.data.response.data;
};

const useCategories = (limit) => {
  return useQuery({
    queryKey: ["Categories",i18n.language,limit],
    queryFn:()=> getCategories(limit),
  });
};

export default useCategories;
