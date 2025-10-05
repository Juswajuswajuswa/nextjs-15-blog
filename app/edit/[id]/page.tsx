import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import EditForm from "../_components/EditForm";

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => ({
    id: post.id,
  }));
}

async function getEditData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) return notFound();

  return data;
}

type Params = Promise<{ id: string }>;

// Server component
export default async function EditPost({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getEditData(id);

  return (
    <div>
      <EditForm data={data} />
    </div>
  );
}
