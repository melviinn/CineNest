import { z } from "zod";

export const createNestNameSchema = z.object({
	title: z.string().min(1).max(100),
})

export type CreateNestNameType = z.infer<typeof createNestNameSchema>;

export const addNestMovieSchema = z.object({
	title: z.string().min(1).max(100),
})

export type AddNestMovieType = z.infer<typeof addNestMovieSchema>;

export const addFriendToNestSchema = z.object({
  username: z.string().min(1).max(50),
});

export type AddFriendToNestType = z.infer<typeof addFriendToNestSchema>;

export const updateProfileFormSchema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
});

export type UpdateProfileType = z.infer<typeof updateProfileFormSchema>;
