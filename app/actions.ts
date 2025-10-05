"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import z from "zod";
import { blogSchema } from "./utils/zodSchema";

export async function handleSubmission(values: z.infer<typeof blogSchema>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/register");

  const result = blogSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  await prisma.blogPost.create({
    data: {
      title: values.title,
      content: values.content,
      imageUrl: values.imageUrl,
      authorId: user?.id,
      authorImage: user?.picture as string,
      authorName: user?.given_name as string,
    },
  });

  revalidatePath("/");

  // redirect("/dashboard");

  return {
    success: true,
    data: result.data,
    message: "Successfully created a blog post!",
  };
}

export async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function updatePost(
  id: string,
  values: z.infer<typeof blogSchema>
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return redirect("/api/auth/register");

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Successfully updated the post",
      post,
    };
  } catch (error) {
    return {
      success: false,
      message: "failed to update",
      error: error,
    };
  }
}

export async function deletedPost(id: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/register");

  try {
    const deletedPost = await prisma.blogPost.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Successfully deleted a post",
      post: deletedPost,
    };
  } catch (error) {
    console.log(error);
  }
}
