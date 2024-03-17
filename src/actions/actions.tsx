'use server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from "zod";
import {
  BookmarkSchema,

  LikeSchema,
 
} from "./schemas";



const CreateQuestion = z.object({
  text: z.string().min(1).max(255),
});
export async function addQuestion(formData: FormData) {
  const { text }  = CreateQuestion.parse({
    text: formData.get('text'),
  });


  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session.user.id; // Assuming user.id is the authorId

  await db.question.create({
    data: {
      text: text,
      authorId: userId, // Use the authorId from the session
    }
  });

  revalidatePath('/question')
}


export async function likePost(value: FormDataEntryValue | null) {

  const session = await getAuthSession();
  const userId = session.user.id;

  const validatedFields = LikeSchema.safeParse({ questionId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Like Post.",
    };
  }

  const { questionId } = validatedFields.data;

  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question) {
    throw new Error("question not found");
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
