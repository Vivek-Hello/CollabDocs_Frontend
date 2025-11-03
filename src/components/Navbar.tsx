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
    <nav className="flex justify-between items-center px-8 py-4 hadow-sm border-b shadow-2xl">
      <h1 className="text-2xl font-semibold text-blue-600 tracking-wide">
        Collab<span className="text-gray-800">Docs</span>
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>{user?.name || "User"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-gray-600">
            {user?.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                logout();
                router.push('/login');
              }}
            >
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
