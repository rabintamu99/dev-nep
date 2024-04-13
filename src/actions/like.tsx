import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function likePost(req : Request, res : Response) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

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
    })

    if (!article) {
      return new Response('Article not found', { status: 404 });
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
    }
  
    return new Response('OK');
  }