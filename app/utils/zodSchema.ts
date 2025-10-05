import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),

  content: z
    .string()
    .min(10, "content must be at least 10 characters")
    .max(500, "content must be at most 400 charaters"),

  status: z.enum(["PUBLISHED", "DRAFT"]).optional(),

  imageUrl: z.url(),
});
