import axios from "axios";
const token=localStorage.getItem("accessToken")
const AuthaxiosInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api/auth/Account"
  
});

export default AuthaxiosInstance;
