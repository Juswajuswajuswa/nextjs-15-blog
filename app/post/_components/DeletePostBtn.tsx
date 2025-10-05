"use client";

import { deletedPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function DeletePostBtn({ id }: { id: string }) {
  const router = useRouter();

  const deletePost = async () => {
    const result = await deletedPost(id);

    if (result?.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <Button onClick={deletePost} variant={"destructive"}>
      Delete
    </Button>
  );
}
