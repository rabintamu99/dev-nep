import ArticleEditor from '@/components/ArticleEditor';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ArticleLikeValidator } from '@/lib/validators/like';
import { z } from 'zod';

export async function PATCH(req: Request) {
  const session = await getAuthSession();
  const body = await req.json();

  if (!session?.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const userId = session.user.id;

  try {
    const { articleId } = ArticleLikeValidator.parse(body);

    console.log(articleId);
    // Check if the user has already liked the article
    const existingLike = await db.like.findFirst({
      where: {
        userId: session.user.id,
        articleId,
      },
    });

    const article = await db.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        author: true,
        likes: true,
      },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    if (existingLike) {
      // If the user has already liked the article, remove the like
      await db.like.delete({
        where: {
          userId_articleId: {
            articleId,
            userId,
          },
        },
      });

      await db.article.update({
        where: {
          id: articleId,

        },
        data: {
          likes_count: {
            decrement: 1,
          }
        }
      });

    } else {
      // If the user hasn't liked the article, create a new like

      await db.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          article: {
            connect: {
              id: articleId,
            },
          },
        },
      });

      await db.article.update({
        where: {
          id: articleId,
        },
        data: {
          likes_count:{
            increment: 1,
          }
        }

      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return a bad request error with the validation errors
      return new Response(JSON.stringify({ error: error.errors }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    // Return a generic server error
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
