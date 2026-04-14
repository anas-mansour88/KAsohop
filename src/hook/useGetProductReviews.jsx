import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';


const useGetProductReviews = (productId) => {
  const queryClient = useQueryClient();

  // 1. جلب التقييمات (GET)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productReviews', productId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Products/${BASE_URL}/${productId}/reviews`);
   
      return response.data.response || response.data;
    },
    enabled: !!productId, // لا يعمل إلا إذا وجد ID
  });

  // 2. إضافة تقييم جديد (POST)
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      return await axios.post(`${BASE_URL}/${productId}/reviews`, newReview);
    },
    onSuccess: () => {
      // تحديث البيانات تلقائياً فور نجاح الإضافة دون عمل Refresh
      queryClient.invalidateQueries(['productReviews', productId]);
    },
  });

  return {
    reviews: data || [],
    isLoading,
    isError,
    error,
    addReview: addReviewMutation.mutate,
    isSubmitting: addReviewMutation.isLoading,
  };
};

export default useGetProductReviews;