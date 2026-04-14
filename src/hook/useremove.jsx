import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export default function useremove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => await axiosInstance.delete(`/Carts/${productId}`),
       onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["Carts"] });}
    
      
});
}
    
   
     
 

