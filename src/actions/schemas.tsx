import {z} from "zod";

export const LikeSchema = z.object({
    questionId: z.string(),
  });
  
  export const BookmarkSchema = z.object({
    postId: z.string(),
  });
  