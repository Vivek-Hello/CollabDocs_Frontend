import { UserI, UserIn, UserLogin } from "@/types";
import { create } from "zustand";
import axiosConfig from "@/lib/axiosConfig";


interface UserState {
  user: UserI | null;
  loading: boolean;
  error: string | null;
  signup: (userData: UserIn) => Promise<void>;
  login: (userData: UserLogin) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const UserStore = create<UserState>((set) =>({
  user: null,
  loading: false,
  error: null,
  signup: async (formData:UserIn) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosConfig.post("/user/signup", formData);
      set({ user: res.data.user, loading: false });
    } catch (err) {
      console.error("Signup failed:", err);
      set({
        user: null,
        loading: false,
        error: "Failed to sign up. Please try again.",
      });
    }
  },
  login:async(formData:UserLogin)=>{
    set({loading:true,error:null});
    try {
        const res = await axiosConfig.post("/user/login",formData);
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        set({user:res.data.user,loading:false});
    } catch (err) {
      console.error("Login failed:", err);
      set({
        user: null,
        loading: false,
        error: "Failed to LogIn. Please try again.",
      });
    }
  },
  logout:async()=>{
    set({loading:true,error:null});
    try {
        const res = await axiosConfig.get("/user/logout");
        set({user:null,loading:false});
    } catch (err) {
      console.error("LogOut failed:", err);
      set({
        user: null,
        loading: false,
        error: "Failed to Logout. Please try again.",
      });
    }
  },
  checkAuth:async()=>{
    set({loading:true,error:null});
    try {
        const res = await axiosConfig.get("/user/check");
        set({user:res.data.user,loading:false});
    } catch (err) {
      console.error("Login Check IN:", err);
      set({
        user: null,
        loading: false,
        error: "Failed to Check IN. Please try again.",
      });
    }
  },
  clearError: () => set({ error: null }),
}),

);
