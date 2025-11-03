'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react"
import { UserIn } from "@/types";
import { UserStore } from "@/store/userStore";
import { useRouter } from 'next/navigation';

export default function page() {
  const {user,signup} =  UserStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserIn>({
    name: '',
    email: '',
    password: '',
  });

  // Corrected handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Add a handleSubmit function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData);
    if (user) {
       router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-800 text-white font-mono">
        <div className="p-4 m-4">
            <h1 className="text-4xl">SignUp Page</h1>
        </div>
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg shadow-lg flex flex-col gap-6 w-96">
        <div className="flex items-center gap-4">
          <Label className="w-24 text-right">Name</Label>
          <Input 
            placeholder="enter your full name" 
            name="name" 
            value={formData.name} 
            type="text" 
            onChange={handleChange} 
          />
        </div>
        <div className="flex items-center gap-4">
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}