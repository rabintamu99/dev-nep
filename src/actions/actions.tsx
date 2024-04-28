'use server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from "zod";


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
