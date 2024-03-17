'use server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

import {
    BookmarkSchema,

    LikeSchema,
   
  } from "./schemas";
  
  export async function likePost(value: FormDataEntryValue | null) {
    const session = await getAuthSession()

    // only rendered if session exists, so this will not happen
  
    const userId = session.user.id;
  
    const validatedFields = LikeSchema.safeParse({ questionId: value });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Like Post.",
      };
    }
  
    const { questionId } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id: questionId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    const like = await db.like.findUnique({
      where: {
        questionId_userId: {
          questionId,
          userId,
        },
      },
    });
  
    if (like) {
      try {
        await db.like.delete({
          where: {
            questionId_userId: {
              questionId,
              userId,
            },
          },
        });
        revalidatePath("/dashboard");
        return { message: "Unliked Post." };
      } catch (error) {
        return { message: "Database Error: Failed to Unlike Post." };
      }
    }
  
    try {
      await db.like.create({
        data: {
          questionId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Liked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Like Post." };
    }
  }