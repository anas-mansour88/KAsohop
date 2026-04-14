import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export default function useupdateitem() {
    const quryclint = useQueryClient();
    
    return useMutation({
      
        mutationFn: async ({ ProductId, Count }) => {
           
            return await axiosInstance.patch(`Carts/${ProductId}`, {
                count: Count 
            });
        },

        onSuccess: () => {
            quryclint.invalidateQueries({ queryKey: ['Carts'] });
        }
    });
}
