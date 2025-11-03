"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { UserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = UserStore();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-700/50 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">⚡</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
          Collab<span className="text-gray-300">Docs</span>
        </h1>
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                      text-white border-0 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {user?.name || "User"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-xl shadow-2xl"
        >
          <DropdownMenuLabel className="text-white font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700/50" />
          <DropdownMenuItem className="text-sm text-gray-300 hover:bg-zinc-800/50 focus:bg-zinc-800/50 cursor-default">
            <div className="flex flex-col">
              <span className="font-medium">{user?.name}</span>
              <span className="text-gray-400 text-xs">{user?.email}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700/50" />
          <DropdownMenuItem className="p-0 hover:bg-transparent focus:bg-transparent">
            <Button
              variant="destructive"
              className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 
                        border-0 transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => {
                logout();
                router.push('/login');
              }}
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;