"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="py-5 flex items-center  justify-between">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold">
          <span className="bg-black text-white p-1 rounded-sm">CRUD</span> Juswa 
          </h1>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-500 transition-colors"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-500 transition-colors"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <div>{user.given_name}</div>
          <LogoutLink className={buttonVariants()}>Log Out</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign Up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
