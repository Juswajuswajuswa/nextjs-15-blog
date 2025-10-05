"use client";

import { blogSchema } from "@/app/utils/zodSchema";
import SubmitButton from "@/components/general/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { updatePost } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export default function EditForm({ data }: { data: EditProps }) {
  const { id } = data;
  const router = useRouter();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: data.title || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof blogSchema>) {
    const result = await updatePost(id, values);

    if (result?.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(`${result.message}, ${result.error}`);
    }
  }

  return (
    <Card className="max-w-lg border mx-auto">
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
        <CardDescription>
          Edit your post to share with the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your title" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your content" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your Content</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>Please select the status</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your image URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
