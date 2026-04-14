import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import i18n from "../langht/i18next";

export default function useProfile() {
  return useQuery({
    queryKey: ["profile",i18n.language],   // ❌ ثابتة وموحدة
    queryFn: async () => {   // ✅ الدالة الصحيحة
      const response = await axiosInstance.get('/Profile');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });
}