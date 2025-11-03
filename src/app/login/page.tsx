"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import React from "react";
import { useState } from "react";
import { UserLogin } from "@/types";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
const page = () => {
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
      router.push("/dashboard")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-zinc-800 text-white font-mono">
      <div className="flex flex-col justify-center items-center outter p-2">
        <div className="p-4 m-4 text-white">
          <h1 className="text-3xl">Login Page</h1>
        </div>

        <form
          action=""
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-8 rounded-lg shadow-lg flex flex-col gap-6 w-96"
        >
          <div className="flex  items-center gap-4">
            <Label className="w-24 text-right">Email</Label>
            <Input
              placeholder="enter your Email"
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24 text-right">Password</Label>
            <div className="relative flex-grow">
              <Input
                placeholder="enter Password"
                onChange={handleChange}
                value={formData.password}
                name="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center   text-gray-400 hover:text-white "
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <Button variant={"secondary"} type="submit">LogIn</Button>
        </form>
      </div>
    </div>
  );
};

export default page;
