import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export default function useCheckout(){
       const quryclint = useQueryClient();
return useMutation({
    mutationFn:async({PaymentMethod})=>{
        return await axiosInstance.post(`/Checkouts`,{PaymentMethod})
    },
    onSuccess:()=>{
          quryclint.invalidateQueries({ queryKey: ['Carts'] });
    }
})
}