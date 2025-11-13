"use client";
import { useEffect } from "react";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, checkAuth } = UserStore();
  const router = useRouter();

  // Call checkAuth once on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect ONLY after auth check is done
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
      // If you want to redirect authenticated users away from protected routes, use this:
      // else { router.push("/dashboard"); }
    }
  }, [loading, user, router]);

  // Show a loading UI while auth check is underway
  if (loading) return <div className="p-10 text-white text-center">Loading...</div>;

  // When user is authenticated, render the children
  return <>{children}</>;
}
