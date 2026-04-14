import { create } from "zustand";

const useAuthStor = create((set) => ({
  token: localStorage.getItem("accessToken") || null,

  setToken: (newToken) => {
    set({ token: newToken });
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  },
}));

export default useAuthStor;