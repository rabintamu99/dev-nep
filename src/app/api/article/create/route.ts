import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ArticleValidator } from '@/lib/validators/article'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, content, tags } = ArticleValidator.parse(body)

    console.log(body);
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const createdPost = await db.article.create({
        data: {
          title,
          content,
          author: {
            connect: {
              id: session.user.id,
            },
          },
          tags: {
            connectOrCreate: tags.map(tag => ({
              where: { name: tag },
              create: { name: tag }
            }))
          },
        },
      });
      
      return new Response(JSON.stringify(createdPost), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {

      return new Response('Error creating post', { status: 500 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not post this time. Please try later', { status: 500 });
  }
}
