import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogPostCard from "@/components/general/BlogPostCard";
import { getData } from "../actions";
import { Input } from "@/components/ui/input";
import BlogSearchInput from "@/components/general/BlogSearch";

export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="my-10 h-[750px]">
      <div className="flex items-center  justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href={"/dashboard/create"}>
          Create Post
        </Link>
      </div>

      <div className="h-full">
        <BlogSearchInput userId={user?.id as string} />
      </div>
    </div>
  );
}
