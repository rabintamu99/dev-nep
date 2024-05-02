"use server";
import { db } from '@/lib/db';
import  { Article }  from '@/types/article';


export const fetchArticles = async (page: number): Promise<Article[] | null> => {
  const perPage = 2;
  const skip = perPage * (page - 1);

  // console.log(`Fetching page ${page}, skipping ${skip} articles, taking ${perPage} articles`);

  try {
    const articles = await db.article.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        likes: true,
      },
    });

    // console.log(`Fetched ${articles.length} articles`);
    // console.log(articles);
    return articles as Article[];
    
  } catch (error) {
    // console.error('Error fetching articles:', error);
    return null;
  }
};
