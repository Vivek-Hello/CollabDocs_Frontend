"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { UserLogin } from "@/types";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";


const Page = () => {
  const { user, login } = UserStore();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const router = useRouter();
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
    if (user) {
      router.push("/dashboard");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-zinc-900 via-gray-900 to-zinc-800 text-white font-mono">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col justify-center items-center relative z-10">
        {/* Header Section */}
        <div className="p-6 m-4 text-center">
          <div className="mb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">⚡</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-3 text-sm">Sign in to continue your journey</p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-zinc-700/50 flex flex-col gap-7 w-96"
        >
          {/* Email Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-right text-gray-300 font-medium text-sm">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                className="bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400 
                         focus:bg-zinc-800/70 focus:border-blue-400 transition-all duration-200
                         rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-right text-gray-300 font-medium text-sm">
                Password
              </Label>
              <div className="relative flex-grow">
                <Input
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400 
                            focus:bg-zinc-800/70 focus:border-blue-400 transition-all duration-200
                            rounded-lg px-4 py-2"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 
                            hover:text-white transition-colors duration-200 hover:scale-110"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            variant={"secondary"} 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
                     hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg 
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                     shadow-lg hover:shadow-xl"
          >
            Sign In
          </Button>

          {/* Additional Links */}
          <div className="text-center pt-2">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <a 
                href="/signup" 
                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Secure login with modern authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
