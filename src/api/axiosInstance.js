import axios from "axios";
import i18n from "../langht/i18next";

const axiosInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
 
});

// إضافة التوكن لكل طلب
axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept-Language']=i18n.language;

  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// معالجة 401 تلقائيًا
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // إذا حصل 401 والتوكن موجود و لم نحاول التجديد سابقاً
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        try {
          // افترض أن لديك endpoint لتجديد التوكن
          const { data } = await axios.post("https://knowledgeshop.runasp.net/api/auth/refresh", {
            token: refreshToken
          });

          localStorage.setItem("accessToken", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest); // إعادة الطلب
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // تحويل لتسجيل الدخول
        }
      } else {
        // لا يوجد Refresh Token، أرسل المستخدم لتسجيل الدخول
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;