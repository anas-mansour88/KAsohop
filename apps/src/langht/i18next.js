import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({
    
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Register":"Register",
          "Cart":"cart",
          "Login":"Login",
          "Logout":"Logout",
          "Categories":"Categories",
           "products":"products",
           "Profile":"Profile"
        }
      },
         ar: {
        translation: {
          "Home": "الرئسيه",
          "Register":"انشاء حساب",
          "Cart":"السلة",
          "Login":"تسجيل الدخول",
          "Categories":"التصنيفات",
          "products":"المنتجات"
          , "Logout":"تسجيل الخروج",
          "Profile":"الصفحة الشخصية"
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;