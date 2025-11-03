"use client";
import { useEffect } from "react";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, checkAuth } = UserStore();
  const router = useRouter();

  // ✅ Call checkAuth only once when the app loads
  useEffect(() => {
    checkAuth();
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  // ✅ While checking token, show loading UI
  if (loading) return <div className="p-10 text-white text-center">Loading...</div>;

  // ✅ If checkAuth fails -> redirect to login
  if (!user) {
    router.push("/login");
  }

  return <>{children}</>;
}
