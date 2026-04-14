import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const getCart = async () => {
  // جلب التوكن يدويًا هنا للتأكد 100% أنه يخرج مع الطلب

  
  const response = await axiosInstance.get("/Carts", 
    
  );

console.log(response.data.response.data)
  return response?.data || response;
};

const useCart = () => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("Token");

  return useQuery({
    queryKey: ["Carts", token], 
    queryFn: getCart,
  
    enabled: !!token, 
    retry: false
  });
};

export default useCart;
