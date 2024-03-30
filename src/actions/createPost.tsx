// app/actions/createPost.ts
'use server';
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostCreationRequest } from "@/lib/validators/post";

export async function createPost({ title, content }: { title: string; content: any }) {

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        // Add any other necessary fields for creating a post
      },
     
      
    });

    return post;
   
  } catch (error) {
    throw new Error(`Error creating post`);
  
  }
}