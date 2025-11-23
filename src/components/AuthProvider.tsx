"use client";
import { useEffect } from "react";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, checkAuth } = UserStore();
  const router = useRouter();

  // Call checkAuth once on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect ONLY after auth check is done
  const pathname = usePathname();

useEffect(() => {
 
  if (!user && !loading) {
    router.push("/login");
  }
  // Redirect only if on login/root page, NOT on /docs/:id etc.
 const redirectToDashboardPaths = ["/", "/login"];
 const privateRoute  = "/docs";
 if (user && pathname.includes(privateRoute)) {
    router.refresh();
 }
 else if (user && redirectToDashboardPaths.includes(pathname)) {
  router.push("/dashboard");
}
}, [user, loading, pathname, router]);

  // Show a loading UI while auth check is underway
  if (loading) return <div className="p-10 text-white text-center">Loading...</div>;

  // When user is authenticated, render the children
  return <>{children}</>;
}
