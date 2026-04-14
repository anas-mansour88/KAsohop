import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import i18n from "../langht/i18next";

const getProduct = async (id) => {
  const response = await axiosInstance.get(`/Products/${id}`);
  
  // اطبع البيانات هنا لتعرف شكلها في الـ Console
  console.log("API Response:", response.data);

  // جرب إرجاع response.data مباشرة إذا كانت البيانات تظهر فيها
  return response.data || null; 
};

const useProduct = (id) => {
  return useQuery({
    queryKey: ["Product", i18n.language, id],
    queryFn: () => getProduct(id), // تأكد أنها هكذا
    enabled: !!id, 
  });
};

export default useProduct; 