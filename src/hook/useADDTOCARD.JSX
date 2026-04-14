import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance"; // تأكد من المسار الصحيح

export default function useADDTOCARD() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ProductId, Count }) => {
    
  return  await axiosInstance.post('/Carts',
    {
      ProductId:ProductId,
      Count:Count
    })

    },

    
})

return Mutation;
}
